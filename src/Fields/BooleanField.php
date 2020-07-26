<?php


namespace Oza75\LaravelHubble\Fields;


use Illuminate\Http\Request;
use Oza75\LaravelHubble\Field;

class BooleanField extends Field
{

    public function __construct(string $name, string $title, bool $sortable = false)
    {
        parent::__construct($name, $title, $sortable);

        $this->displayUsing(function ($value) {
            return $value === 1;
        });

        $this->text('Oui', 'Non');
    }

    protected function registerComponents()
    {
        parent::registerComponents();

        $this->components = [
            'index' => 'show-boolean-field',
            'editing' => 'edit-boolean-field',
            'creating' => 'edit-boolean-field',
            'details' => 'show-boolean-field'
        ];
    }

    /**
     * @param string $checked
     * @param string|null $unchecked
     * @return $this
     */
    public function text(string $checked, ?string $unchecked = 'No')
    {
        $this->addAttribute('checkedText', $checked);
        $this->addAttribute('unCheckedText', $unchecked);

        return $this;
    }

    /**
     * @param Request $request
     * @param string $section
     * @return bool|mixed
     */
    public function retrieveFormData(Request $request, string $section)
    {
        return (bool)$request->get($this->getName());
    }
}
