<?php

namespace Oza75\LaravelHubble\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Oza75\LaravelHubble\Hubble
 * @method static string namespace(?string $name = null)
 * @method static string prefix()
 * @method static \Oza75\LaravelHubble\Contracts\Hubble setResourcesFolder(string $path, string $namespace);
 * @method static string getResourcesFolder();
 * @method static string getResourcesNamespace();
 * @method static array getResources();
 * @method static \Oza75\LaravelHubble\Contracts\Hubble addResource(string $resource);
 * @method static \Oza75\LaravelHubble\Contracts\Hubble setResources(array $resources);
 * @method static \Oza75\LaravelHubble\Contracts\Hubble addResources(array $resources);
 * @method static array getBooted();
 * @method static mixed config(string $key, $default = null);
 * @method static \Oza75\LaravelHubble\Contracts\Hubble disableAutoDiscovering();
 * @method static bool autoRegisterResources();
 */
class Hubble extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return \Oza75\LaravelHubble\Contracts\Hubble::class;
    }
}
