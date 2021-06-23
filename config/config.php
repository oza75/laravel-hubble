<?php

/*
 * Laravel Hubble configuration
 * @package oza75/laravel-hubble
 * @author Aboubacar Ouattara <abouba181@gmail.com>
 */

use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Oza75\LaravelHubble\Middleware\HubbleAuthMiddleware;
use Oza75\LaravelHubble\Middleware\HubbleGuestMiddleware;

return [
    "prefix" => "/hubble", // the path that will be used to access to your hubble dashboard

    "resources_folder" => "app/Hubble", // a psr-4 namespace that will hold all your hubble resources,

    "resource_namespace" => "App\Hubble",

    "middlewares" => [
        "auth" => HubbleAuthMiddleware::class,
        "guest" => HubbleGuestMiddleware::class,
    ],

    "routeMiddlewares" => [
        "api" => [
            EncryptCookies::class,
            AddQueuedCookiesToResponse::class,
            StartSession::class,
            ShareErrorsFromSession::class,
            'api', 'hubble.auth'
        ],
        "web" => ['web', 'hubble.auth']
    ],

    "controllers" => [
        'api' => \Oza75\LaravelHubble\Controller\ApiController::class,
        'web' => \Oza75\LaravelHubble\Controller\HubbleController::class,
    ],

    "mappers" => [
        'index' => \Oza75\LaravelHubble\Resources\IndexResource::class,
        'detail' => \Oza75\LaravelHubble\Resources\DetailResource::class,
        'edit' => \Oza75\LaravelHubble\Resources\EditResource::class,
        'create' => \Oza75\LaravelHubble\Resources\CreateResource::class,
    ]
];
