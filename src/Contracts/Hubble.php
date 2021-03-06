<?php


namespace Oza75\LaravelHubble\Contracts;

use Illuminate\Foundation\Auth\User;
use Oza75\LaravelHubble\HubbleResource;

interface Hubble
{
    /**
     * @param string $name
     * @return HubbleResource|null
     */
    public function getResourceByName(string $name);

    /**
     * @return mixed
     */
    public function sidebarLinks();

    /**
     * @param string $name
     * @return mixed
     */
    public function getResource(string $name);

    /**
     * @param string|null $namespace
     * @return string
     */
    public function namespace(?string $namespace = null): string;

    /**
     * @return string
     */
    public function prefix(): string;

    /**
     * @param string $path
     * @param string $namespace
     * @return mixed
     */
    public function setResourcesFolder(string $path, string $namespace);

    /**
     * @return string
     */
    public function getResourcesFolder(): string;

    /**
     * @return mixed
     */
    public function disableAutoDiscovering();

    /**
     * @return mixed
     */
    public function autoRegisterResources();

    /**
     * @param string $key
     * @param mixed|null $default
     * @return mixed
     */
    public function config(string $key, $default = null);
}
