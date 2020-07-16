<?php


namespace Oza75\LaravelHubble\Tests\TestResources;


use Oza75\LaravelHubble\Action;

class TestAction extends Action
{
    /**
     * @var string the title of this action
     */
    protected $title = 'TestAction';

    /**
     * @var string the confirmation message to warn user before running this action. Set to null to disable it
     */
    protected $confirmationMessage = 'Do you really want to perform this action ?';

    /**
     * Handle your action
     *
     * @param $ids
     * @return void
     */
    public function handle($ids)
    {
        // TODO: Implement handle() method.
    }
}
