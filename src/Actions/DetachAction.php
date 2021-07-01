<?php


namespace Oza75\LaravelHubble\Actions;


use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\LazyCollection;
use Oza75\LaravelHubble\Action;
use Oza75\LaravelHubble\Concerns\HandlesAuthorization;

class DetachAction extends Action
{
    use HandlesAuthorization;

    public function __construct(?string $name = null, ?string $title = null, ?string $confirmationMessage = null)
    {
        parent::__construct(
            $name,
            $title ?? __('laravel-hubble::dashboard.detach'),
            $confirmationMessage ?? __('laravel-hubble::dashboard.detach_items_message')
        );
    }

    /**
     * @param LazyCollection $models
     * @param Builder $builder
     * @return array|string|null
     */
    public function handle(LazyCollection $models, Builder $builder)
    {
        $ids = $models->pluck($this->resource->getKey())->values()->all();
        $relationship = $this->resource->getRelationship();

        if ($relationship instanceof HasMany || $relationship instanceof MorphMany || $relationship instanceof MorphOne) {
            $relationship->getRelated()->newQuery()
                ->whereIn($this->resource->getKey(), $ids)
                ->update([$relationship->getForeignKeyName() => null]);
        } elseif ($relationship instanceof BelongsToMany) {
            $relationship->detach($ids);
        } else {
            return [
                'message' => __('laravel-hubble::dashboard.detach-error'),
                'state' => 'error'
            ];
        }

        return __('laravel-hubble::dashboard.detached');
    }

    /**
     * @param User $user
     * @param Model|null $model
     * @return bool
     * @throws Exception
     */
    public function can(User $user, ?Model $model = null): bool
    {
        if (is_null($model) && is_null($this->resource)) {
            return true;
        }

        $model = $model ?? $this->resource->getModel();

        return $this->canAccess('delete', $model);
    }

    public function boot($resource)
    {
        parent::boot($resource);


        $this->setUrl(route('api.hubble.related.action', [
            'name' => $resource->getParent()->getName(),
            'key' => $resource->getParentModel()->{$resource->getParentModel()->getKeyName()},
            'field' => $resource->getField()->getName(),
            'action' => $this->getName(),
        ]));
    }
}
