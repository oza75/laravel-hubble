<?php


namespace Oza75\LaravelHubble;


use Illuminate\Routing\Router;
use Oza75\LaravelHubble\Commands\CreateActionCommand;
use Oza75\LaravelHubble\Commands\CreateFieldCommand;
use Oza75\LaravelHubble\Commands\CreateFilterCommand;
use Oza75\LaravelHubble\Commands\CreateResourceCommand;
use Oza75\LaravelHubble\Commands\InstallationCommand;
use Oza75\LaravelHubble\Export\ExcelExport;
use Oza75\LaravelHubble\Export\ResourceExporter;

class ServiceProvider extends \Illuminate\Support\ServiceProvider
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

        $this->app->bind(ResourceExporter::class, function ($app) {
            /** @var \Oza75\LaravelHubble\Contracts\Hubble $hubble */
            $hubble = $app->make(\Oza75\LaravelHubble\Contracts\Hubble::class);

            return app($hubble->config("exporter", ExcelExport::class));
        });
    }
}
