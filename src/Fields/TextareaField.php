<?php


namespace Oza75\LaravelHubble\Fields;


use Oza75\LaravelHubble\Field;

class TextareaField extends TextField
{
    /**
     * TextareaField constructor.
     * @param string $name
     * @param string $title
     * @param bool $sortable
     */
    public function __construct(string $name,?string $title = null, bool $sortable = false)
    {
        parent::__construct($name, $title, $sortable);
    }

    protected function registerComponents()
    {
        parent::registerComponents();

        $this->components['editing'] = 'edit-textarea-field';
        $this->components['creating'] = 'edit-textarea-field';

        $this->visibility['index'] = false;
    }

}
