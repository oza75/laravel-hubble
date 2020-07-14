<?php

namespace Oza75\LaravelHubble;

use Illuminate\Foundation\Auth\User;
use Oza75\LaravelHubble\Contracts\Hubble as Contract;

class Hubble implements Contract
{
    protected $resources = [];

    protected $booted = [];

    protected $namespace = "Oza75\LaravelHubble\Controller\\";

    protected $resourcePath;

    protected $autoDiscovering = true;

    public function __construct(?array $resources = [])
    {
        $this->resourcePath = app_path('HubbleResources');
        $this->resources = $resources;

        $this->boot();
    }

    /**
     * @param string $name
     * @return mixed|null
     */
    public function getResourceByName(string $name)
    {
        foreach ($this->booted as $booted) {
            if ($booted->getName() === $name) return $booted;
        }

        return null;
    }

    /**
     * @return mixed
     */
    public function sidebarLinks()
    {
        return collect($this->booted)->map(function ($resource) {
            $icon = method_exists($resource, 'icon') ? $resource->icon() : $resource->icon ?? null;

            return [
                'title' => $resource->getTitle(),
                'icon' => $icon,
                'url' => route('hubble.index', ['name' => $resource->getName()])
            ];
        });
    }

    /**
     * Instantiate all resources
     */
    private function boot()
    {
        foreach ($this->resources as $resource) {
            $this->booted[$resource] = new $resource();
        }
    }

    /**
     * @param string $name
     * @return mixed
     */
    public function getResource(string $name)
    {
        $resource = $this->getResourceByName($name);
        if (is_null($resource)) abort(404);

        $resource->boot();

        return $resource;
    }

    /**
     * @param string|null $namespace
     * @return string
     */
    public function namespace(?string $namespace = null): string
    {
        if ($namespace) {
            $this->namespace = $namespace;
        }

        return $this->namespace;
    }

    /**
     * @return string
     */
    public function prefix(): string
    {
        return config('laravel-hubble.prefix');
    }

    /**
     * @param string $path
     * @return mixed
     */
    public function setResourcePath(string $path)
    {
        $this->resourcePath = $path;

        return $this;
    }

    /**
     * @return mixed
     */
    public function disableAutoDiscovering()
    {
        $this->autoDiscovering = false;

        return $this;
    }
}
