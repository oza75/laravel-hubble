<?php


namespace Oza75\LaravelHubble\Fields;


class ColorField extends TextField
{
    public function __construct(string $name, ?string $title = null, bool $sortable = false)
    {
        parent::__construct($name, $title, $sortable);
        $this->type('color');
    }

    protected function registerComponents()
    {
        parent::registerComponents();

        $this->components['details'] = 'show-color-picker-field';
        $this->components['index'] = 'show-color-picker-field';
    }

    public function displayUsingHex()
    {
        $this->addProp('useHex', true);

        return $this;
    }
}
