<?php

namespace Oza75\LaravelHubble\Configuration;

use Illuminate\Support\Collection;
use Oza75\LaravelHubble\HubbleResource;

class Configuration
{
    protected $screens = [];
    /**
     * @var HubbleResource
     */
    private $resource;

    /**
     * Configuration constructor.
     * @param HubbleResource $resource
     */
    public function __construct(HubbleResource $resource)
    {
        $this->resource = $resource;
    }

    public static function make(HubbleResource $resource): Configuration
    {
        return new static($resource);
    }

    public function index(callable $callable)
    {
        $this->screens['index'] = $callable;
    }

    public function details(callable $callable)
    {
        $this->screens['details'] = $callable;
    }

    public function edit(callable $callable)
    {
        $this->screens['edit'] = $callable;
    }

    public function create(callable $callable)
    {
        $this->screens['create'] = $callable;
    }

    protected function items(): Collection
    {
        return collect($this->screens)->map(function (callable $callback, $name) {
            $configuration = ScreenConfiguration::make();
            $callback($configuration, $this->resource->getCurrentItem());
            return $configuration;
        });
    }

    public function toArray(): array
    {
        return $this->items()->mapWithKeys(function ($configuration, $name) {
            return [$name => $configuration->toArray()];
        })->all();
    }

    /**
     * @param string $screen
     * @return ScreenConfiguration
     */
    public function getScreenConfiguration(string $screen): ScreenConfiguration
    {
        $callback = $this->screens[$screen] ?? null;

        if (!$callback) return ScreenConfiguration::make();

        $configuration = ScreenConfiguration::make();

        $callback($configuration, $this->resource->getCurrentItem());

        return $configuration;
    }
}
