<?php


namespace Oza75\LaravelHubble;


class TableButton
{
    /**
     * @var string
     */
    protected $name;
    /**
     * @var string|null
     */
    protected $url;
    /**
     * @var string|null
     */
    protected $classes;

    /**
     * @var null
     */
    protected $component = 'table-button';
    /**
     * @var callable|bool
     */
    protected $visible = true;

    /**
     * @var array of attributes
     */
    protected $attributes = [];

    /**
     * TableButton constructor.
     * @param string $name
     * @param string|null $url
     * @param string|null $classes
     */
    public function __construct(string $name, ?string $url = null, ?string $classes = 'btn-primary')
    {
        $this->name = $name;
        $this->url = $url;
        $this->classes = $classes;
    }

    /**
     * @param mixed ...$arguments
     * @return $this
     */
    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

    /**
     * @param null $component
     * @return TableButton
     */
    public function setComponent($component)
    {
        $this->component = $component;
        return $this;
    }

    public function toArray()
    {
        return array_merge([
            'name' => $this->name,
            'url' => $this->url,
            'classes' => $this->classes,
            'component' => $this->component
        ], $this->attributes);
    }

    /**
     * @param callable $condition
     * @return $this
     */
    public function displayWhen(callable $condition)
    {
        $this->visible = $condition;

        return $this;
    }

    /**
     * @return bool|callable|mixed
     */
    public function isVisible()
    {
        if (is_bool($this->visible)) return $this->visible;

        if (is_callable($this->visible)) return call_user_func($this->visible, auth()->user());

        return true;
    }

    /**
     * @param string|null $url
     * @return TableButton
     */
    public function setUrl(?string $url): TableButton
    {
        $this->url = $url;
        return $this;
    }

    /**
     * @param string|null $classes
     * @return TableButton
     */
    public function setClasses(?string $classes): TableButton
    {
        $this->classes = $classes;
        return $this;
    }

    /**
     * @param string $key
     * @param $value
     * @return $this
     */
    public function addAttribute(string $key, $value)
    {
        $this->attributes[$key] = $value;

        return $this;
    }
}
