<?php


namespace Oza75\LaravelHubble\Tests\TestResources;


use Illuminate\Database\Eloquent\Builder;
use Oza75\LaravelHubble\Filter;

class CustomFilter extends Filter
{
    /**
     * @var string the title of your filter that will be shown on the ui.
     */
    protected $title = 'Custom filter';

    /**
     * Apply your filter
     *
     * @param Builder $query
     * @param $value
     * @return CustomFilter|void
     */
    public function handle(Builder $query, $value)
    {
        return null;
    }

    /**
     * Return all options for this filter
     *
     * @return array
     */
    public function options()
    {
        return [];
    }
}
