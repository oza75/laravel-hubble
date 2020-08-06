<?php


namespace Oza75\LaravelHubble\Fields;


class NumberField extends TextField
{
    /**
     * NumberField constructor.
     * @param string $name
     * @param string $title
     * @param bool $sortable
     */
    public function __construct(string $name, ?string $title = null, bool $sortable = false)
    {
        parent::__construct($name, $title, $sortable);

        $this->type('number');
    }
}
