<?php


namespace Oza75\LaravelHubble\Actions;


use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\LazyCollection;
use Oza75\LaravelHubble\Action;
use Oza75\LaravelHubble\Concerns\HandlesAuthorization;

class DeleteAction extends Action
{
    use HandlesAuthorization;

    /**
     * DeleteAction constructor.
     *
     * @param string|null $name
     * @param string|null $title
     * @param string|null $confirmationMessage
     */
    public function __construct(?string $name = null, ?string $title = null, ?string $confirmationMessage = null)
    {
        parent::__construct(
            $name,
            $title ?? __('laravel-hubble::dashboard.delete'),
            $confirmationMessage ?? __('laravel-hubble::dashboard.delete_items_message')
        );

        $this->onlyInIndex();
    }

    /**
     * Handle your action
     *
     * @param LazyCollection $collection
     * @param Builder $builder
     * @return mixed
     */
    public function handle(LazyCollection $collection, Builder $builder)
    {
        $builder = $builder->newQuery();

        $builder->where(function (Builder  $builder) use ($collection) {
            $collection->chunk(500)->each(function ($items) use ($builder) {
                $builder->orWhereIn('id', collect($items)->pluck('id'));
            });
        });

        $builder->delete();
    }

    /**
     * @param User $user
     * @param Model|null $model
     * @return bool
     * @throws Exception
     */
    public function can(User $user, ?Model $model = null): bool
    {
        if (is_null($model)) return true;

        return $this->canAccess('delete', $model);
    }
}
