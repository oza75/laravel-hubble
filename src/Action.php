<?php


namespace Oza75\LaravelHubble;


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
    protected $title;

    /**
     * @var array[]
     */
    private $hooks = [
        'before' => [],
        'after' => []
    ];

    /**
     * Action constructor.
     * @param string|null $name
     * @param string $title
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
     * @param $ids
     * @return void
     */
    public abstract function handle($ids);

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
            'confirm_message' => $this->confirmationMessage,
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
     * @param $items
     */
    public function run($items)
    {
        $this->runHook($items, 'before');

        $this->handle($items);

        $this->runHook($items, 'after');
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
     * @param $items
     * @param string $type
     */
    protected function runHook($items, string $type)
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
}
