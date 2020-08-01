<?php


namespace Oza75\LaravelHubble;


class TableModal extends TableButton
{
    protected $component = 'table-modal';

    protected $fields = [];

    protected $section = 'creating';

    public function __construct(string $name, ?string $url = null, ?string $classes = 'btn-primary')
    {
        parent::__construct($name, $url, $classes);

        $this->addAttribute('cancelText', trans('laravel-hubble::dashboard.cancel'));
        $this->addAttribute('confirmText', trans('laravel-hubble::dashboard.confirm'));
    }

    /**
     * @param string $title
     * @return $this
     */
    public function title(string $title)
    {
        $this->addAttribute('title', $title);

        return $this;
    }

    /**
     * @param array $fields
     * @return $this
     */
    public function setFields(array $fields)
    {
        $this->fields = $fields;

        return $this;
    }

    public function toArray()
    {
        return array_merge(parent::toArray(),
            [
                'fields' => $this->getFields($this->section)->toArray()
            ]
        );
    }

    private function getFields(string $section)
    {
        return collect($this->fields)->mapWithKeys(function (Field $field) use ($section) {
            return $field->toArray($section);
        })->values();
    }

    /**
     * @param string $text
     * @return $this
     */
    public function cancelText(string $text)
    {
        $this->addAttribute('cancelText', $text);

        return $this;
    }

    /**
     * @param string $text
     * @return $this
     */
    public function confirmText(string $text)
    {
        $this->addAttribute('confirmText', $text);

        return $this;
    }
}
