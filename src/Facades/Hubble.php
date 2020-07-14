<?php

namespace Oza75\LaravelHubble\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Oza75\LaravelHubble\Hubble
 * @method static string namespace(?string $name = null)
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
