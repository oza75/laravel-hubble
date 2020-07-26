<?php


namespace Oza75\LaravelHubble\Fields;


class ImageField extends FileField
{
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
