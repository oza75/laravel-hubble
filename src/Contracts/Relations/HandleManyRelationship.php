<?php


namespace Oza75\LaravelHubble\Contracts\Relations;


use Oza75\LaravelHubble\HubbleResource;

interface HandleManyRelationship
{
    /**
     * @return HubbleResource
     */
    public function getRelatedResource(): HubbleResource;
}
