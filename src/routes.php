<?php

use Illuminate\Support\Facades\Route;
use Oza75\LaravelHubble\Facades\Hubble;

$namespace = Hubble::namespace();
$prefix = Hubble::prefix();

Route::prefix($prefix)
    ->group(function () use ($namespace) {
        Route::middleware(['web', 'hubble.auth'])->group(function () use ($namespace) {
            Route::get('/', "{$namespace}HubbleController@home")
                ->name('hubble.home');

            Route::get('/resources/{name}', "{$namespace}HubbleController@index")
                ->name('hubble.index');

            Route::put('/resources/{name}/{key}/update', "{$namespace}HubbleController@update")
                ->name('hubble.update');

            Route::get('/resources/{name}/{key}/edit', "{$namespace}HubbleController@edit")
                ->name('hubble.edit');

            Route::get('/resources/{name}/create', "{$namespace}HubbleController@create")
                ->name('hubble.create');

            Route::post('/resources/{name}/store', "{$namespace}HubbleController@store")
                ->name('hubble.store');

            Route::delete('/resources/{name}/{key}', "{$namespace}HubbleController@destroy")
                ->name('hubble.delete');

            Route::get('/resources/{name}/{key}', "{$namespace}HubbleController@show")
                ->name('hubble.show');
        });
        Route::view('/login', 'laravel-hubble::login')->name('hubble.login');
//        Route::middleware(['web'])->group(function () use ($namespace) {
//            Route::get('/login', 'Auth\AdminLoginController@showLoginForm')->name('admin.login');
//            Route::post('/logout', 'Auth\AdminLoginController@logout')->name("admin.logout");
//            Route::post('/login', 'Auth\AdminLoginController@login')->name('admin.login.attempt');
//        });
    });

Route::prefix("/api{$prefix}")
    ->middleware(['api', 'hubble.auth'])
    ->group(function () use ($namespace) {
        Route::get('/resources/{name}', "{$namespace}ApiHubbleController@index")
            ->name('api.hubble.index');

        Route::get('/resources/{name}/{key}/{field}', "{$namespace}ApiHubbleController@relatedIndex")
            ->name('api.hubble.related.index');

        Route::get('/resources/{name}/{id}/edit', "{$namespace}ApiHubbleController@edit")
            ->name('api.hubble.edit');

        Route::post('/resources/{name}/actions/{action}', "{$namespace}ApiHubbleController@action")
            ->name('api.hubble.action');

        Route::delete('/resources/{name}/{key}', "{$namespace}ApiHubbleController@destroy")
            ->name('api.hubble.delete');

        Route::delete('/resources/{name}/{key}/{field}/detach/{id}', "{$namespace}ApiHubbleController@detachItem")
            ->name('api.hubble.related.detach');

        Route::post('/resources/{name}/{key}/{field}/attach', "{$namespace}ApiHubbleController@attachItem")
            ->name('api.hubble.related.attach');

        Route::get('/resources/{name}/{key}/fields/{field}/related', "{$namespace}ApiHubbleController@fieldRelatedOptions")
            ->name('api.hubble.fields.related');

    });
