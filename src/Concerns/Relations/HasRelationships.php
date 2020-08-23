<?php


namespace Oza75\LaravelHubble\Concerns\Relations;


use Illuminate\Database\Eloquent\Model;
use Oza75\LaravelHubble\HubbleResource;

trait HasRelationships
{
    /**
     * @var string the related resource
     */
    protected $related;

    protected $methodName;

    /**
     * @return Model|null
     */
    protected function getModel(): ?Model
    {
        return $this->resource->getModel();
    }

    /**
     * @param Model $model
     * @param $relationship
     */
    private function guessColumnName(Model $model, $relationship)
    {
        $this->setName($relationship->getForeignKeyName());
    }

    /**
     * @return HubbleResource
     */
    private function newRelatedInstance()
    {
        return new $this->related;
    }

}
