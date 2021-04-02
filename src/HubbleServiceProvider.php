<?php

namespace Oza75\LaravelHubble;

use Illuminate\Foundation\Auth\User;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Oza75\LaravelHubble\Commands\CreateActionCommand;
use Oza75\LaravelHubble\Commands\CreateFieldCommand;
use Oza75\LaravelHubble\Commands\CreateFilterCommand;
use Oza75\LaravelHubble\Commands\CreateResourceCommand;
use Oza75\LaravelHubble\Commands\InstallationCommand;
use Oza75\LaravelHubble\Export\ExcelExport;
use Oza75\LaravelHubble\Export\ResourceExporter;
use Oza75\LaravelHubble\Middleware\HubbleAuthMiddleware;

class HubbleServiceProvider extends ServiceProvider
{
    protected $autoRegistration = true;

    protected $resources = [];

    /**
     * Bootstrap the application services.
     */
    public function boot()
    {
        Gate::define('viewHubble', function (User $user) {
            return $this->authorizesAccess($user);
        });

        if ($this->autoRegistration) {
            \Oza75\LaravelHubble\Facades\Hubble::autoRegisterResources();
        }
    }

    /**
     * Register the application services.
     */
    public function register()
    {
        $resources = method_exists($this, 'resources') ? $this->resources() : $this->resources;

        \Oza75\LaravelHubble\Facades\Hubble::addResources($resources);
    }

    /**
     * @param User $user
     * @return bool
     */
    public function authorizesAccess(User $user): bool
    {
        return true;
    }
}
