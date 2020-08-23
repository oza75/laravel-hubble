<?php

namespace Oza75\LaravelHubble;

use Exception;
use Illuminate\Support\Str;
use Oza75\LaravelHubble\Contracts\Hubble as Contract;

class Hubble implements Contract
{
    protected $resources = [];

    protected $booted = [];

    protected $namespace = "Oza75\LaravelHubble\Controller\\";

    protected $resourcesFolder;

    protected $resourcesNamespace;

    protected $autoDiscovering = true;

    /**
     * Hubble constructor.
     * @param array|null $resources
     */
    public function __construct(?array $resources = [])
    {
        $this->resources = $resources;
        $this->setDefaultResourcesPaths();

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
        return collect($this->booted)
            ->filter(function ($resource) {
                return $resource->isAccessible();
            })
            ->map(function ($resource) {
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
     * @param string $namespace
     * @return mixed
     */
    public function setResourcesFolder(string $path, string $namespace)
    {
        if (!$this->autoDiscovering) {
            throw new \LogicException('You have already disable resource auto registration. You can only set resources namespace only if resource auto discovering is activated');
        }

        $this->resourcesFolder = Str::finish(realpath($path), '/');
        $this->resourcesNamespace = $namespace;

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

    /**
     * Register all resources defined in the resource namespace and boot them
     *
     * @return bool|mixed
     * @throws Exception
     */
    public function autoRegisterResources()
    {
        if (!$this->autoDiscovering) return false;

        $files = glob($this->resourcesFolder . '*.php');
        if (empty($files)) return false;

        $resources = collect($files)->map(function ($file) {
            return $this->resourcesNamespace . '\\' . basename($file, '.php');
        })->filter(function ($class) {
            if (!class_exists($class)) return false;
            $reflection = new \ReflectionClass($class);
            return $reflection->isSubclassOf(HubbleResource::class) && $reflection->isInstantiable();
        })->toArray();

        $this->resources = $resources;

        $this->boot();

        return true;
    }

    /**
     * @return string
     */
    public function getResourcesFolder(): string
    {
        return $this->resourcesFolder;
    }

    /**
     * @return array|null
     */
    public function getResources(): ?array
    {
        return $this->resources;
    }

    /**
     * Add manually a new resource to Hubble
     *
     * @param string $resource
     * @return Hubble
     */
    public function addResource(string $resource)
    {
        $this->resources[] = $resource;
        $this->booted[$resource] = new $resource;

        return $this;
    }

    /**
     * Set hubble resources
     *
     * @param array $resources
     * @return $this
     */
    public function setResources(array $resources)
    {
        $this->resources = $resources;

        $this->boot();

        return $this;
    }

    /**
     * @param array $resources
     * @return $this
     */
    public function addResources(array $resources)
    {
        $this->resources = array_merge($this->resources, $resources);

        foreach ($resources as $resource) {
            $this->booted[$resource] = new $resource;
        }

        return $this;
    }

    /**
     * @return array
     */
    public function getBooted(): array
    {
        return $this->booted;
    }

    private function setDefaultResourcesPaths(): void
    {
        $folder = config('laravel-hubble.resources_folder', "app/Hubble");
        $namespace = config('laravel-hubble.resources_namespace', "App\\Hubble");

        if (!app()->runningUnitTests()) {
            $folder = base_path($folder);
        }
        $folder = Str::finish($folder, '/');

        $this->resourcesFolder = $folder;
        $this->resourcesNamespace = $namespace;
    }

    /**
     * @return mixed
     */
    public function getResourcesNamespace()
    {
        return $this->resourcesNamespace;
    }
}
