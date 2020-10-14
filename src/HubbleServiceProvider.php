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
use Oza75\LaravelHubble\Middleware\HubbleAuthMiddleware;

class HubbleServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     */
    public function boot()
    {
        $router = $this->app->make(Router::class);
        $router->aliasMiddleware('hubble.auth', config('laravel-hubble.middlewares.auth'));
        $router->aliasMiddleware('hubble.guest', config('laravel-hubble.middlewares.guest'));

        /*
         * Optional methods to load your package assets
         */
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'laravel-hubble');
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'laravel-hubble');
        // $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes.php');

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../config/config.php' => config_path('laravel-hubble.php'),
            ]);

            // Publishing the views.
            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/laravel-hubble'),
            ], 'views');

            // Publishing assets.
            $this->publishes([
                __DIR__ . '/../resources/assets' => public_path('vendor/laravel-hubble'),
            ], 'public');

//            $this->publishes([
//                __DIR__ . '/../resources/js' => resource_path('components/laravel-hubble'),
//            ], 'assets');
//
//            $this->publishes([
//                __DIR__ . '/../resources/sass' => resource_path('sass/laravel-hubble'),
//            ], 'assets');

            // Publishing the translation files.
            $this->publishes([
                __DIR__ . '/../resources/lang' => resource_path('lang/vendor/laravel-hubble'),
            ], 'lang');

            // Registering package commands.
            $this->commands([
                InstallationCommand::class,
                CreateResourceCommand::class,
                CreateActionCommand::class,
                CreateFilterCommand::class,
                CreateFieldCommand::class
            ]);
        }

        Gate::define('viewHubble', function (User $user) {
            return true;
        });

        \Oza75\LaravelHubble\Facades\Hubble::autoRegisterResources();
    }

    /**
     * Register the application services.
     */
    public function register()
    {
        // Automatically apply the package configuration
        $this->mergeConfigFrom(__DIR__ . '/../config/config.php', 'laravel-hubble');

        // Register the main class to use with the facade
        $this->app->singleton(\Oza75\LaravelHubble\Contracts\Hubble::class, function () {
            return new Hubble;
        });
    }
}
