<?php


namespace Oza75\LaravelHubble\Actions;


use Illuminate\Database\Eloquent\Builder;
use Oza75\LaravelHubble\Action;

class DeleteAction extends Action
{
    /**
     * @var Builder
     */
    protected $builder;

    /**
     * DeleteAction constructor.
     *
     * @param Builder $builder
     * @param string|null $name
     * @param string|null $title
     * @param string|null $confirmationMessage
     */
    public function __construct(Builder $builder, ?string $name = null, ?string $title = null, ?string $confirmationMessage = null)
    {
        parent::__construct($name, $title, $confirmationMessage);

        $this->builder = $builder;
    }

    /**
     * Handle your action
     *
     * @param $ids
     * @return mixed
     */
    public function handle($ids)
    {
        $this->builder->newQuery()->where('id', $ids)->delete();
    }
}
