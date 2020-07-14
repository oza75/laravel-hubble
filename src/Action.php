<?php


namespace Oza75\LaravelHubble;


abstract class Action
{
    /**
     * @var string
     */
    private $name;
    /**
     * @var string|null
     */
    private $confirmationMessage;
    /**
     * @var string
     */
    private $title;

    /**
     * @var array[]
     */
    private $hooks = [
        'before' => [],
        'after' => []
    ];

    /**
     * Action constructor.
     * @param string $name
     * @param string $title
     * @param string|null $confirmationMessage
     */
    public function __construct(string $name, string $title, ?string $confirmationMessage = null)
    {
        $this->name = $name;
        $this->confirmationMessage = $confirmationMessage;
        $this->title = $title;
    }

    /**
     * @param string $name
     * @param string $title
     * @param string|null $confirmationMessage
     * @return self
     */
    public static function make(string $name, string $title, ?string $confirmationMessage = null)
    {
        return new static($name, $title, $confirmationMessage);
    }

    /**
     * @param $items
     * @return mixed
     */
    public abstract function handle($items);

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
            'name' => $this->name,
            'title' => $this->title,
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
        return $this->name;
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
}
