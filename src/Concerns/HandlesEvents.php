<?php


namespace Oza75\LaravelHubble\Concerns;


trait HandlesEvents
{
    /**
     * @var array[] list of events
     */
    protected static $events = [
        'creating' => [],
        'created' => [],
        'updating' => [],
        'updated' => [],
        'deleting' => [],
        'deleted' => [],
    ];

    /**
     * @param string $name
     * @param callable $callable
     * @return $this
     */
    public function registerEvent(string $name, callable $callable)
    {
        static::$events[$name][] = $callable;

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function creating(callable $callable)
    {
        $this->registerEvent('creating', $callable);

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function created(callable $callable)
    {
        $this->registerEvent('created', $callable);

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function updating(callable $callable)
    {
        $this->registerEvent('updating', $callable);

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function updated(callable $callable)
    {
        $this->registerEvent('updated', $callable);

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function deleting(callable $callable)
    {
        $this->registerEvent('deleting', $callable);

        return $this;
    }

    /**
     * @param callable $callable
     * @return $this
     */
    public function deleted(callable $callable)
    {
        $this->registerEvent('deleted', $callable);

        return $this;
    }

    /**
     * @param string $name
     * @param mixed ...$arguments
     */
    protected function fireEvent(string $name, ...$arguments)
    {
        $events = static::$events[$name];

        foreach ($events as $event) $event(...$arguments);
    }
}
