<?php

use Illuminate\Support\Facades\Route;
use Oza75\LaravelHubble\Facades\Hubble;

$namespace = Hubble::namespace();
$prefix = Hubble::prefix();
$webController = Hubble::config('controllers.web');
$apiController = Hubble::config('controllers.api');

Route::prefix($prefix)
    ->group(function () use ($namespace, $webController) {
        Route::middleware(Hubble::config("routeMiddlewares.web"))
            ->group(function () use ($namespace, $webController) {
                Route::get('/', [$webController, 'home'])->name('hubble.home');

                Route::get('/resources/{name}', [$webController, 'index'])->name('hubble.index');

                Route::put('/resources/{name}/{key}/update', [$webController, 'update'])->name('hubble.update');

                Route::get('/resources/{name}/{key}/edit', [$webController, 'edit'])->name('hubble.edit');

                Route::get('/resources/{name}/create', [$webController, 'create'])->name('hubble.create');

                Route::post('/resources/{name}/store', [$webController, 'store'])->name('hubble.store');

                Route::delete('/resources/{name}/{key}', [$webController, 'destroy'])->name('hubble.delete');

                Route::get('/resources/{name}/{key}', [$webController, 'show'])->name('hubble.show');

            });

        Route::get('/login', [$webController, 'showLoginForm'])
            ->middleware(['web', 'hubble.guest'])
            ->name('hubble.login');
    });

Route::prefix("/api{$prefix}")
    ->middleware(Hubble::config("routeMiddlewares.api"))
    ->group(function () use ($namespace, $apiController) {
        Route::get('/resources/{name}', [$apiController, 'index'])
            ->name('api.hubble.index');

        Route::get('/resources/{name}/export', [$apiController, 'export'])
            ->name('api.hubble.export');

        Route::get('/resources/{name}/{key}', [$apiController, 'show'])
            ->name('api.hubble.show');

        Route::get('/resources/{name}/{key}/{field}', [$apiController, 'relatedIndex'])
            ->name('api.hubble.related.index');

        Route::get('/resources/{name}/{key}/{field}/export', [$apiController, 'relatedExport'])
            ->name('api.hubble.related.export');

        Route::get('/resources/{name}/{id}/edit', [$apiController, 'edit'])
            ->name('api.hubble.edit');

        Route::post('/resources/{name}/actions/{action}', [$apiController, 'action'])
            ->name('api.hubble.action');

        Route::delete('/resources/{name}/{key}', [$apiController, 'destroy'])
            ->name('api.hubble.delete');

        Route::delete('/resources/{name}/{key}/{field}/detach/{id}', [$apiController, 'detachItem'])
            ->name('api.hubble.related.detach');

        Route::post('/resources/{name}/{key}/{field}/attach', [$apiController, 'attachItem'])
            ->name('api.hubble.related.attach');

        Route::get('/resources/{name}/{key}/fields/{field}/related', [$apiController, 'fieldRelatedOptions'])
            ->name('api.hubble.fields.related');

        Route::post('/validation', [$apiController, 'validate'])->name('api.hubble.validation');
    });
