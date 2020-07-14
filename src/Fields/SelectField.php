<?php


namespace Oza75\LaravelHubble\Fields;


use Oza75\LaravelHubble\Field;
use Oza75\LaravelHubble\Resource;

class SelectField extends Field
{
    protected $options = [];

    /**
     * SelectField constructor.
     * @param string $name
     * @param string $title
     * @param array $options
     * @param bool $sortable
     */
    public function __construct(string $name, string $title, $options = [], bool $sortable = false)
    {
        parent::__construct($name, $title, $sortable);

        $this->options = $options;

        $this->setValueKey('value');
        $this->setTextKey('text');
        $this->addAttribute('emptyOptionName', 'Pas de ' . $this->title);
    }

    protected function registerComponents()
    {
        parent::registerComponents();

        $this->components['editing'] = 'edit-select-field';
        $this->components['creating'] = 'edit-select-field';
    }

    /**
     * @param $options
     * @return SelectField
     */
    public function options($options)
    {
        $this->options = $options;

        return $this;
    }

    /**
     * @param string $key
     * @return $this
     */
    public function setValueKey(string $key)
    {
        $this->addAttribute('valueKey', $key);

        return $this;
    }

    /**
     * @param string $key
     * @return $this
     */
    public function setTextKey(string $key)
    {
        $this->addAttribute('textKey', $key);

        return $this;
    }

    public function toArray(string $section = 'index')
    {
        if (in_array($section, ['creating', 'editing'])) {
            $this->addAttribute('options', $this->formatOptions());
        }

        return parent::toArray($section);
    }

    /**
     * @return array|string
     */
    protected function formatOptions()
    {
        if (empty($this->options) || is_string($this->options)) return $this->options;

        $firstOption = collect($this->options)->first(function ($value) {
            return !is_null($value);
        });

        if (is_string($firstOption) || is_numeric($firstOption)) {
            return collect($this->options)->map(function ($value, $key) {
                return ['value' => $value, 'text' => $key];
            })->values()->toArray();
        }

        return $this->options;
    }

    /**
     * @param array $options
     * @return SelectField
     */
    public function setOptions(array $options): SelectField
    {
        $this->options = $options;
        $this->addAttribute('options', $options);

        return $this;
    }

    /**
     * @return $this
     */
    public function displayUsingLabel()
    {
        if (is_string($this->options)) return $this;
        $options = $this->formatOptions();

        $resolver = function ($value) use ($options) {
            if (is_null($value)) return;
            $item = collect($options)->firstWhere($this->getAttribute('valueKey'), $value);
            if (is_null($item)) return;

            return $item[$this->getAttribute('textKey')];
        };

        $this->displayOnDetailsUsing($resolver);
        $this->displayOnIndexUsing($resolver);

        return $this;
    }
}
