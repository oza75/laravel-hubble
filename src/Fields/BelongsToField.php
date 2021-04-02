<?php


namespace Oza75\LaravelHubble\Fields;


use Illuminate\Support\Str;
use Oza75\LaravelHubble\HubbleResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class BelongsToField
 * @method static BelongsToField make(string $method_name, string $related, ?string $title = null, ?bool $sortable = false)
 * @package Oza75\Hubble\Fields
 */
class BelongsToField extends SelectField
{
    /**
     * @var string the related resource
     */
    protected $related;

    protected $methodName;

    /**
     * BelongsToField constructor.
     * @param string $methodName
     * @param string $related
     * @param string|null $title
     * @param bool $sortable
     */
    public function __construct(string $methodName, string $related, ?string $title = null, ?bool $sortable = false)
    {
        $this->methodName = $methodName;
        $this->related = $related;

        parent::__construct($methodName, $title ?? Str::title($methodName), [], $sortable);

        $this->addValueResolver();
    }

    /**
     * @param Model $model
     * @param BelongsTo $relationship
     */
    private function getOptionsFromRelated(Model $model, BelongsTo $relationship)
    {
        $related = $this->newRelatedInstance();

        $relatedModel = $related->getModel();

        $this->options = $relatedModel->newQuery()->pluck($relationship->getOwnerKeyName(), $related->getDisplayColumn());

    }

    /**
     * @param HubbleResource $resource
     */
    public function boot(HubbleResource $resource)
    {
        parent::boot($resource);

        $model = $resource->getModel();

        $relationship = $model->{$this->methodName}();

        $this->guessColumnName($model, $relationship);

//        $this->registerDisplayResolver($resource);

    }

    public function toArray(string $section = 'index')
    {
        if (in_array($section, ['creating', 'editing'])) {
            $model = $this->resource->getModel();
            $relationship = $model->{$this->methodName}();

            $this->getOptionsFromRelated($model, $relationship);
        }

        return parent::toArray($section);
    }

    /**
     * @param Model $model
     * @param BelongsTo $relationship
     */
    private function guessColumnName(Model $model, BelongsTo $relationship)
    {
        $this->setName($relationship->getForeignKeyName());
    }

    /**
     * @return Resource
     */
    private function newRelatedInstance()
    {
        return new $this->related;
    }

    /**
     * @param HubbleResource $resource
     */
    protected function registerDisplayResolver(HubbleResource $resource)
    {
        $related = $this->newRelatedInstance();

        $callable = function ($value, $data) use ($related) {
            $relation = $data->{$this->methodName};
            if (!$relation) return null;

            $url = route('hubble.show', [
                'name' => $related->getName(),
                'key' => $relation->{$related->getKey()}
            ]);

            return "<a href='{$url}' class='default--color'>{$value}</a>";
        };

        $this->displayOnDetailsUsing($callable);
        $this->displayOnIndexUsing($callable);
//        $this->displayWhenExportingUsing($callable);
    }

    public function resolveData($value, $resource, string $type)
    {
        $this->registerDisplayResolver($this->resource);

        return parent::resolveData($value, $resource, $type);
    }

    private function addValueResolver()
    {
        $callable = function ($value, $data) {
            $model = $data->{$this->methodName};
            $related = $this->newRelatedInstance();
            return $model->{$related->getDisplayColumn()} ?? $this->default;
        };

        $this->displayOnIndexUsing($callable);
        $this->displayOnDetailsUsing($callable);
    }
}
