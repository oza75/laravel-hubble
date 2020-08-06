<?php


namespace Oza75\LaravelHubble\Fields;


class ImageField extends FileField
{
    public function __construct(string $name, ?string $title = null)
    {
        parent::__construct($name, $title);

        $this->accept('image/*');
    }

    protected function registerComponents()
    {
        parent::registerComponents();

        $this->components = [
            'index' => 'index-image-field',
            'editing' => 'edit-image-field',
            'creating' => 'edit-image-field',
            'details' => 'show-image-field'
        ];
    }
}
