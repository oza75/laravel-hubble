<?php


namespace Oza75\LaravelHubble\Fields;


use Oza75\LaravelHubble\HubbleResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class BelongsToField
 * @method static BelongsToField make(string $method_name, string $title, string $related, ?bool $sortable = false)
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
     * @param string $title
     * @param string $related
     * @param bool $sortable
     */
    public function __construct(string $methodName, string $title, string $related, bool $sortable = false)
    {
        $this->methodName = $methodName;
        $this->related = $related;

        parent::__construct($methodName, $title, [], $sortable);
    }

    /**
     * @param Model $model
     * @param BelongsTo $relationship
     */
    private function getOptionsFromRelated(Model $model, BelongsTo $relationship)
    {
        $related = $this->newRelatedInstance();

        $relatedModel = $related->baseQuery()->getModel();

        $this->options = $relatedModel->newQuery()->pluck($relationship->getOwnerKeyName(), $related->getDisplayColumn());

    }

    /**
     * @param HubbleResource $resource
     */
    public function prepare(HubbleResource $resource)
    {
        parent::prepare($resource);

        $model = $resource->baseQuery()->getModel();

        $relationship = $model->{$this->methodName}();

        $this->guessColumnName($model, $relationship);

        $this->registerDisplayResolver($resource);

    }

    public function toArray(string $section = 'index')
    {
        if (in_array($section, ['creating', 'editing'])) {
            $model = $this->resource->baseQuery()->getModel();
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

            $name = $relation->{$related->getDisplayColumn()} ?? $this->default;
            $url = route('hubble.show', [
                'name' => $related->getName(),
                'key' => $relation->{$related->getKey()}
            ]);

            return "<a href='{$url}' class='default--color'>{$name}</a>";
        };

        $this->displayOnDetailsUsing($callable);
        $this->displayOnIndexUsing($callable);
    }
}
