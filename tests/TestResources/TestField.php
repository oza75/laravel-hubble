<?php


namespace Oza75\LaravelHubble\Tests\TestResources;


use Oza75\LaravelHubble\Field;
use Oza75\LaravelHubble\HubbleResource;

class TestField extends Field
{
    /**
     * @var string[] $components
     */
    protected $components = [
        'index' => 'index-text-field',
        'editing' => 'edit-text-field',
        'creating' => 'edit-text-field',
        'details' => 'show-text-field'
    ];

    /**
     * This hook is called when the field is ready to work.
     * Basically it will just set the HubbleResourcewithin your field is added.
     * So it your have some attributes to add  or actions that depends on the resource
     * this is where you should do it.
     *
     * @param HubbleResource $resource
     */
    public function boot(HubbleResource $resource)
    {
        parent::boot($resource);

        // do action that depends on the resource within this field is added
    }
}
