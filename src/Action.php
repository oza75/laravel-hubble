<?php


namespace Oza75\LaravelHubble;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\LazyCollection;
use Illuminate\Support\Str;

abstract class Action
{
    /**
     * @var string
     */
    protected $name;
    /**
     * @var string|null
     */
    protected $confirmationMessage;

    /**
     * @var string
     */
    protected $component = 'confirm-action';
    /**
     * @var string
     */
    protected $title;

    /**
     * @var array[]
     */
    protected $hooks = [
        'before' => [],
        'after' => []
    ];

    protected $visibility = [
        'index' => true,
        'details' => true
    ];

    /**
     * @var array
     */
    protected $props = [];

    /**
     * Action constructor.
     * @param string|null $name
     * @param string|null $title
     * @param string|null $confirmationMessage
     */
    public function __construct(?string $name = null, ?string $title = null, ?string $confirmationMessage = null)
    {
        if ($name) $this->name = $name;
        if ($title) $this->title = $title;
        if ($confirmationMessage) $this->confirmationMessage = $confirmationMessage;
    }

    /**
     * @param array $arguments
     * @return self
     */
    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

    /**
     * @param LazyCollection $models
     * @param Builder $builder
     * @return array|string|void|null
     */
    public abstract function handle(LazyCollection $models, Builder $builder);

    /**
     * @param string $name
     * @return Action
     */
    public function setName(string $name): Action
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @param string|null $confirmationMessage
     * @return Action
     */
    public function setConfirmationMessage(?string $confirmationMessage): Action
    {
        $this->confirmationMessage = $confirmationMessage;
        return $this;
    }

    public function toArray()
    {
        return [
            'name' => $this->getName(),
            'title' => $this->getTitle(),
            'icon' => $this->icon() ?? null,
            'component' => $this->component,
            'props' => array_merge($this->getProps(), [
                'confirmMessage' => $this->confirmationMessage
            ]),
        ];
    }

    /**
     * @param string $title
     * @return Action
     */
    public function setTitle(string $title): Action
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name ?? Str::kebab(class_basename($this));
    }

    /**
     * @param LazyCollection $collection
     * @param Builder $query
     * @return array|string|void|null
     */
    public function run(LazyCollection $collection, Builder $query)
    {
        $models = $this->allows($collection);

        $this->runHook($models, 'before');

        $message = $this->handle($models, $query);

        $this->runHook($models, 'after');

        return $message;
    }

    /**
     * @param callable $callable
     * @return Action
     */
    public function beforeRunning(callable $callable)
    {
        $this->hooks['before'][] = $callable;
        return $this;
    }

    /**
     * @param callable $callable
     * @return Action
     */
    public function afterRunning(callable $callable)
    {
        $this->hooks['after'][] = $callable;
        return $this;
    }

    /**
     * @param LazyCollection $items
     * @param string $type
     */
    protected function runHook(LazyCollection $items, string $type)
    {
        $hooks = $this->hooks[$type] ?? [];

        foreach ($hooks as $hook) {
            $hook($items);
        }
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title ?? Str::studly(class_basename($this));
    }

    /**
     * Determines if the current user can perform this action
     *
     * @param User $user
     * @param Model|null $model
     * @return bool
     */
    public function can(User $user, ?Model $model = null): bool
    {
        return true;
    }

    /**
     * @param LazyCollection $collection
     * @return LazyCollection
     */
    protected function allows(LazyCollection $collection)
    {
        return $collection->filter(function ($item) {
            return $this->can(auth()->user(), $item);
        });
    }

    /**
     * @return string url of the icon
     */
    protected function icon()
    {
    }

    public function onlyInIndex()
    {
        $this->visibility['index'] = true;
        $this->visibility['details'] = false;
    }

    public function onlyOnDetails()
    {
        $this->visibility['index'] = false;
        $this->visibility['details'] = true;
    }

    /**
     * @param string $section
     * @return bool
     */
    public function visiblesIn(string $section)
    {
        return $this->visibility[$section] ?? false;
    }

    /**
     * @param string $name
     * @param mixed $value
     * @return $this
     */
    public function addProp(string $name, $value)
    {
        $this->props[$name] = $value;

        return $this;
    }

    /**
     * @param string $name
     * @param mixed $default
     * @return mixed|null
     */
    public function getProp(string $name, $default = null)
    {
        return $this->props[$name] ?? $default;
    }

    public function getProps()
    {
        return $this->props;
    }
}
