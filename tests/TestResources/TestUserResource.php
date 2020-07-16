<?php


namespace Oza75\LaravelHubble\Tests\TestResources;


use Illuminate\Database\Eloquent\Builder;
use Oza75\LaravelHubble\Action;
use Oza75\LaravelHubble\Actions\DeleteAction;
use Oza75\LaravelHubble\Field;
use Oza75\LaravelHubble\Filter;
use Oza75\LaravelHubble\HubbleResource;
use Oza75\LaravelHubble\Tests\Models\TestUser;

class TestUserResource extends HubbleResource
{
    /**
     * @var string The title will be used as your resource name in the ui
     */
    protected $title = "Articles";

    /**
     * @var string The name of your resource. Used to find your resource and in api requests
     */
    protected $name = "articles";

    /**
     * @var string[]
     */
    protected $searchColumns = ['title'];

    /**
     * @var string used to show resource value in relationship
     */
    protected $displayColumn = 'title';

    /**
     * @return Field[] array of fields
     */
    public function fields()
    {
        return [];
    }

    /**
     * @return Action[] array of actions
     */
    public function actions()
    {
        return [
           DeleteAction::make(TestUser::query()),
        ];
    }

    /**
     * @return Filter[] array of filters
     */
    public function filters()
    {
        return [];
    }

    /**
     * @return Builder
     */
    public function baseQuery(): Builder
    {
        return TestUser::query();
    }
}
