<?php


namespace Oza75\LaravelHubble\Fields;


class ColorPicker extends TextField
{
    public function __construct(string $name, string $title, bool $sortable = false)
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
        $this->addAttribute('useHex', true);

        return $this;
    }
}
