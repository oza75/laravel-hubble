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
     * @return mixed
     */
    public function setResourcePath(string $path);

    /**
     * @return mixed
     */
    public function disableAutoDiscovering();
}
