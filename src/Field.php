<?php


namespace Oza75\LaravelHubble;


use Illuminate\Support\Str;
use Oza75\LaravelHubble\Concerns\HandlesVisibility;
use Illuminate\Http\Request;
use Oza75\LaravelHubble\Fields\BooleanField;
use Oza75\LaravelHubble\Fields\DateTimeField;
use Oza75\LaravelHubble\Fields\NumberField;

class Field
{
    use HandlesVisibility;

    /**
     * @var string
     */
    protected $name;
    /**
     * @var string
     */
    protected $title;
    /**
     * @var bool
     */
    protected $sortable;

    protected $default = null;

    protected $displayResolver = [
        'index' => null,
        'editing' => null,
        'creating' => null,
        'details' => null,
    ];

    protected $resource;

    /**
     * @var mixed|string[]
     */
    protected $components = [
        'index' => 'index-text-field',
        'editing' => 'edit-text-field',
        'creating' => 'edit-text-field',
        'details' => 'show-text-field'
    ];

    /**
     * @var array
     */
    protected $attributes = [];

    /**
     * @var string
     */
    private $usedAsDefaultSort;

    /**
     * Field constructor.
     * @param string $name
     * @param string $title
     * @param bool $sortable
     */
    public function __construct(string $name, string $title, bool $sortable = false)
    {
        $this->name = $name;
        $this->title = $title;
        $this->sortable = $sortable;

        $this->registerComponents();
        $this->setIsNumeric();
    }

    protected function registerComponents()
    {
    }

    /**
     * @param array $arguments
     * @return static
     */
    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

    /**
     * @param string $name
     * @return Field
     */
    public function setName(string $name): Field
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @param string $title
     * @return Field
     */
    public function setTitle(string $title): Field
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @param bool $default
     * @param string $defaultType
     * @return Field
     */
    public function sortable(bool $default = false, string $defaultType = 'asc'): Field
    {
        $this->sortable = true;
        if ($default) $this->usedAsDefaultSort = $defaultType;

        return $this;
    }

    public function prepare(HubbleResource $resource)
    {
        $this->resource = $resource;
    }

    /**
     * @param string $section
     * @return array[]
     */
    public function toArray(string $section = 'index')
    {
        return [
            $this->name => [
                'name' => $this->getName(),
                'title' => $this->getTitle(),
                'sortable' => $this->sortable,
                'components' => $this->components,
                'attributes' => $this->attributes,
            ]
        ];
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param $value
     * @param $resource
     * @param string $type
     */
    public function resolveData($value, $resource, string $type)
    {
        $resolver = $this->displayResolver[$type] ?? null;

        if (is_null($resolver)) {
            return $value;
        }

        return $resolver($value, $resource);
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function displayOnIndexUsing(callable $callable)
    {
        $this->addDisplayResolver($callable, 'index');

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function displayOnDetailsUsing(callable $callable)
    {
        $this->addDisplayResolver($callable, 'details');

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function displayOnFormsUsing(callable $callable)
    {
        $this->addDisplayResolver($callable, 'editing');
        $this->addDisplayResolver($callable, 'creating');

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function displayWhenEditingUsing(callable $callable)
    {
        $this->addDisplayResolver($callable, 'editing');

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function displayWhenCreatingUsing(callable $callable)
    {
        $this->addDisplayResolver($callable, 'creating');

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function displayUsing(callable $callable)
    {
        $this->addDisplayResolver($callable, 'index');
        $this->addDisplayResolver($callable, 'editing');
        $this->addDisplayResolver($callable, 'creating');
        $this->addDisplayResolver($callable, 'details');

        return $this;
    }

    /**
     * @param callable $callable
     * @param string $type
     * @return $this
     */
    protected function addDisplayResolver(callable $callable, string $type)
    {
        $this->displayResolver[$type] = $callable;
        return $this;
    }

    /**
     * @return bool
     */
    public function isSortable(): bool
    {
        return $this->sortable;
    }

    /**
     * @return string
     */
    public function getDefaultSortType(): string
    {
        return $this->usedAsDefaultSort;
    }

    /**
     * @return bool
     */
    public function isUsedAsDefaultSort(): bool
    {
        return !!$this->usedAsDefaultSort;
    }

    /**
     * @param $value
     * @return $this
     */
    public function default($value)
    {
        $this->default = $value;
        $this->addAttribute('defaultValue', $value);

        return $this;
    }


    /**
     * @param string $name
     * @param $value
     * @return $this
     */
    public function addAttribute(string $name, $value)
    {
        $this->attributes[$name] = $value;

        return $this;
    }

    /**
     * @param string $name
     * @param $default
     * @return mixed
     */
    public function getAttribute(string $name, $default = null)
    {
        return $this->attributes[$name] ?? $default;
    }

    /**
     * @param string $value
     * @return Field
     */
    public function placeholder(string $value)
    {
        $this->addAttribute('placeholder', $value);

        return $this;
    }

    /**
     * @param Request $request
     * @param string $section
     * @return mixed
     */
    public function retrieveFormData(Request $request, string $section)
    {
        return $request->get($this->name);
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    private function setIsNumeric()
    {
        if ($this instanceof NumberField || $this instanceof DateTimeField)
            $this->addAttribute('is_numeric', true);
    }
}
