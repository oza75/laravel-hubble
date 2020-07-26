<?php


namespace Oza75\LaravelHubble;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class Filter
{
    /**
     * @var string
     */
    protected $column;

    /**
     * @var string
     */
    protected $title;

    /**
     * @var array|string array of options or an url where to fetch options
     */
    protected $options;

    /**
     * @var bool
     */
    protected $multiple;

    /**
     * @var callable
     */
    protected $handler;

    protected $component = 'hubble-checkbox-filter';
    /**
     * @var string[]
     */
    protected $attributes = [
        'valueKey' => 'value',
        'textKey' => 'text'
    ];

    /**
     * Filter constructor.
     * @param string $column
     * @param string $title
     * @param array $options
     */
    public function __construct(?string $column = null, ?string $title = null, $options = [])
    {
        if ($column) $this->column = $column;
        if ($title) $this->title = $title;
        $this->options = $options;
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
     * @param string $column
     * @return Filter
     */
    public function setColumn(string $column): Filter
    {
        $this->column = $column;
        return $this;
    }

    /**
     * @param string $title
     * @return Filter
     */
    public function setTitle(string $title): Filter
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return Filter
     */
    public function multiple(): Filter
    {
        $this->multiple = true;
        return $this;
    }


    /**
     * @param callable $callable
     * @return Filter
     */
    public function setHandler(callable $callable): Filter
    {
        $this->handler = $callable;

        return $this;
    }

    /**
     * @param Builder $query
     * @param $value
     * @return $this
     */
    public function handle(Builder $query, $value)
    {
        if ($this->handler) {
            call_user_func($this->handler, $query, $value);

            return $this;
        }

        if ($this->multiple) $query->whereIn($this->column, $value);
        else $query->where($this->column, $value);

        return $this;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return [
            'name' => $this->getName(),
            'title' => $this->title,
            'multiple' => $this->multiple,
            'options' => $this->getOptions(),
            'attributes' => $this->attributes,
            'component' => $this->component
        ];
    }

    /**
     * @return string
     */
    public function getColumn(): string
    {
        return $this->column;
    }

    /**
     * @param string $key
     * @return $this
     */
    public function setValueKey(string $key): self
    {
        $this->attributes['valueKey'] = $key;

        return $this;
    }

    /**
     * @param string $key
     * @return $this
     */
    public function setTextKey(string $key): self
    {
        $this->attributes['textKey'] = $key;

        return $this;
    }

    /**
     * @return array|string
     */
    protected function getOptions()
    {
        $options = method_exists($this, 'options') ? $this->options() : $this->options;

        if (empty($options) || is_string($options)) return $options;

        $firstOption = collect($options)->first(function ($value) {
            return !is_null($value);
        });

        if (is_string($firstOption) || is_numeric($firstOption) || is_bool($firstOption)) {
            return collect($options)->map(function ($value, $key) {
                return ['value' => $value, 'text' => $key];
            })->values()->toArray();
        }

        return $options;
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
     * @param string|null $placeholder
     * @return Filter
     */
    public function searchable(?string $placeholder = null)
    {
        $this->addAttribute('searchable', true);

        if ($placeholder)
            $this->addAttribute('searchPlaceholder', $placeholder);

        return $this;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->getColumn() ?? $this->getTitle();
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title ?? Str::kebab(Str::lower(class_basename($this)));
    }
}
