<?php


namespace Oza75\LaravelHubble\Actions;

use Illuminate\Database\Eloquent\Builder;
use Oza75\LaravelHubble\Action;

class DeleteAction extends Action
{
    public function __construct(string $name, string $title, ?string $confirmationMessage = null)
    {
        $confirmationMessage = $confirmationMessage ?? 'Voulez vous vraiment supprimer cet enregistrement ?';

        parent::__construct($name, $title, $confirmationMessage);
    }

    /**
     * @var Builder
     */
    private $query;

    /**
     * @param $items
     * @return mixed
     */
    public function handle($items)
    {
        $this->query->whereIn('id', $items)->delete();
    }


    /**
     * @param Builder $query
     * @return DeleteAction
     */
    public function setQuery(Builder $query)
    {
        $this->query = $query;
        return $this;
    }
}
