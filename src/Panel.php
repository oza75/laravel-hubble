<?php


namespace Oza75\LaravelHubble;


use Oza75\LaravelHubble\Concerns\HandlesVisibility;
use Oza75\LaravelHubble\Contracts\Arrayable;
use Oza75\LaravelHubble\Contracts\HasVisibility;

class Panel implements HasVisibility
{
    use HandlesVisibility;

    /**
     * @var Field[]
     */
    protected $fields = [];

    protected $resource;

    /**
     * @var string the component that will be used to display the panel
     */
    protected $mComponent = 'hubble-panel';
    /**
     * @var string
     */
    protected $title;

    /**
     * Panel constructor.
     * @param string $title
     * @param array $fields
     */
    public function __construct(array $fields = [], string $title = '')
    {
        $this->fields = $fields;
        $this->title = $title;
    }

    /**
     * @param string $component
     * @return Panel
     */
    public function component(string $component)
    {
        $this->mComponent = $component;

        return $this;
    }

    public function toArray(string $section): array
    {
        return [
            'component' => $this->mComponent,
            'title' => $this->title,
            'fields' => $this->parseFields($section),
            'data' => $this->data($section)
        ];
    }

    /**
     * @param string $title
     * @param array $fields
     * @return static
     */
    public static function make(array $fields = [], string $title = '')
    {
        return new static(...func_get_args());
    }

    /**
     * @param HubbleResource $resource
     */
    public function prepare(HubbleResource $resource)
    {
        $this->resource = $resource;
    }

    /**
     * @param string $section
     * @return array
     */
    protected function parseFields(string $section)
    {
        return collect($this->fields)->filter(function (Field $field) use ($section) {
            return $field->isVisibleOn($section);
        })->mapWithKeys(function (Field $field) {
            $field->prepare($this->resource);
            return $field->toArray();
        })->toArray();
    }

    /**
     * @param string $section
     * @return array
     */
    protected function data(string $section)
    {
        return [];
    }

    public function getFields()
    {
        return $this->fields;
    }
}
