<?php

/*
 * Laravel Hubble configuration
 * @package oza75/laravel-hubble
 * @author Aboubacar Ouattara <abouba181@gmail.com>
 */

use Oza75\LaravelHubble\Middleware\HubbleAuthMiddleware;
use Oza75\LaravelHubble\Middleware\HubbleGuestMiddleware;

return [
    "prefix" => "/hubble", // the path that will be used to access to your hubble dashboard

    "resources_folder" => "app/Hubble", // a psr-4 namespace that will hold all your hubble resources,

    "resource_namespace" => "App\Hubble",

    "middlewares" => [
        "auth" => HubbleAuthMiddleware::class,
        "guest" => HubbleGuestMiddleware::class,
    ]
];
