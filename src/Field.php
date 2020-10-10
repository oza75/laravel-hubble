<?php


namespace Oza75\LaravelHubble;


use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Oza75\LaravelHubble\Concerns\HandlesRules;
use Oza75\LaravelHubble\Concerns\HandlesVisibility;
use Illuminate\Http\Request;
use Oza75\LaravelHubble\Contracts\HasVisibility;
use Oza75\LaravelHubble\Fields\BooleanField;
use Oza75\LaravelHubble\Fields\DateTimeField;
use Oza75\LaravelHubble\Fields\NumberField;

class Field implements HasVisibility
{
    use HandlesVisibility, HandlesRules;

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

    protected $default = 'N/A';

    protected $displayResolver = [
        'index' => [],
        'editing' => [],
        'creating' => [],
        'details' => [],
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
     * @var bool|callable
     */
    protected $disabled = false;

    /**
     * @var array of all props that will be passed to field components
     */
    protected $props = [
        'index' => [],
        'editing' => [],
        'creating' => [],
        'details' => [],
    ];

    /**
     * @var array of all attributes that will passed to field html input when editing or creating
     */
    protected $attributes = [
        'index' => [],
        'editing' => [],
        'creating' => [],
        'details' => [],
    ];

    /**
     * @var string
     */
    private $usedAsDefaultSort;

    /**
     * Field constructor.
     * @param string $name
     * @param string|null $title
     * @param bool $sortable
     */
    public function __construct(string $name, ?string $title = null, bool $sortable = false)
    {
        $this->name = $name;
        $this->title = $title ?? Str::title($name);
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

    public function boot(HubbleResource $resource)
    {
        $this->resource = $resource;

    }

    /**
     * @param string $section
     * @return array[]
     */
    public function toArray(string $section = 'index')
    {
        $data = [
            'name' => $this->getName(),
            'title' => $this->getTitle(),
            'sortable' => $this->sortable,
            'components' => $this->components,
            'props' => $this->getProps($section),
            'attributes' => $this->getAttributes($section),
        ];


        if (in_array($section, ['creating', 'editing'])) {
            $data = array_merge($data, [
                'rules' => $this->parsedRules($section)
            ]);
        }

        return [
            $this->name => $data
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
     * @return mixed
     */
    public function resolveData($value, $resource, string $type)
    {
        $this->registerDefaultResolver();

        $resolvers = $this->displayResolver[$type] ?? [];

        if (empty($resolvers)) {
            return $value;
        }

        return collect($resolvers)->reduce(function ($carry, $resolver) use ($resource) {
            return $resolver($carry, $resource);
        }, $value);
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
        $this->displayResolver[$type][] = $callable;

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
        $this->addProp('defaultValue', $value);

        return $this;
    }


    /**
     * @param string $name
     * @param $value
     * @param null $section
     * @param bool $when
     * @return $this
     */
    public function addProp(string $name, $value, $section = null, $when = true)
    {
        if ($section === null) $section = ['index', 'editing', 'creating', 'details'];

        foreach (Arr::wrap($section) as $screen) {
            $this->props[$screen][$name] = [
                'value' => $value,
                'condition' => $when
            ];
        }

        return $this;
    }

    /**
     * @param string $name
     * @param $value
     * @param null $section
     * @param bool $when
     * @return $this
     */
    public function addAttribute(string $name, $value, $section = null, $when = true)
    {
        if ($section === null) $section = ['index', 'editing', 'creating', 'details'];

        foreach (Arr::wrap($section) as $screen) {
            $this->attributes[$screen][$name] = [
                'value' => $value,
                'condition' => $when
            ];
        }

        return $this;
    }

    /**
     * @param string $name
     * @param $value
     * @return $this
     */
    public function inputAttribute(string $name, $value)
    {
        $attributes = $this->getProp('input', []);

        $attributes[$name] = $value;

        $this->addProp('input', $attributes);

        return $this;
    }

    /**
     * @param string $name
     * @param null $default
     * @param string $section
     * @return mixed
     */
    public function getProp(string $name, $default = null, $section = 'index')
    {
        $prop = $this->props[$section][$name] ?? ['value' => null, 'condition' => true];

        $condition = $prop['condition'] ?? true;

        if (is_callable($condition)) $condition = call_user_func($condition, Auth::user(), null);

        return $condition ? $prop['value'] : $default;
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
            $this->addProp('is_numeric', true);
    }

    /**
     * @param string $classes
     * @param string|null $section
     * @return $this
     */
    public function classes(string $classes, ?string $section = null)
    {
        $all = $this->getProp('classes', []);
        if ($section) $all[$section] = $classes;
        else {
            $all['index'] = $classes;
            $all['edit'] = $classes;
            $all['create'] = $classes;
            $all['details'] = $classes;
        }

        $this->addProp('classes', $all);

        return $this;
    }

    protected function registerDefaultResolver(): void
    {
        $resolver = function ($value) {
            if (is_null($value)) return $this->default;
            return $value;
        };

        $this->displayOnDetailsUsing($resolver);
        $this->displayOnIndexUsing($resolver);
        if ($this->default !== 'N/A') {
            $this->displayOnFormsUsing($resolver);
        }
    }

    /**
     * @param bool $condition
     * @return $this
     */
    public function disable($condition = true)
    {
        $this->addAttribute('disabled', true, null, $condition);

        return $this;
    }


    /**
     * @param string $section
     * @return array|mixed
     */
    protected function getProps(string $section)
    {
        $props = collect($this->props[$section] ?? []);

        $props = $props->filter(function ($item) {
            $when = $item['condition'] ?? true;

            return is_bool($when) ? $when : $when(auth()->user(), $this->resource->getCurrentItem());
        })->map(function ($item) {
            return $item['value'];
        });

        return $props->toArray();
    }

    /**
     * @param string $section
     * @return array|mixed
     */
    private function getAttributes(string $section)
    {
        $attributes = collect($this->attributes[$section] ?? []);

        $attributes = $attributes->filter(function ($item) {
            $condition = $item['condition'] ?? true;

            return is_bool($condition)
                ? $condition
                : $condition(auth()->user(), $this->resource->getCurrentItem());

        })->map(function ($item) {
            return $item['value'];
        });

        return $attributes->toArray();
    }
}
