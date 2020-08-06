<?php


namespace Oza75\LaravelHubble\Utilities\Javascript;


use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\ViewErrorBag;

class JavascriptServiceProvider extends ServiceProvider
{

    public function boot()
    {
        View::composer("laravel-hubble::partials.js-php-vars", function ($view) {
            $session = session();
            $errors = $session->get('errors');

            if ($errors && $errors instanceof ViewErrorBag) {
                $errors = $errors->toArray();
            } else {
                $errors = [];
            }

            $notifications = [];
            if ($notification = $session->get('notification')) {
                $notifications[] = $notification;
            }

            JavascriptPut::put([
                '_old' => $session->getOldInput(),
                '_errors' => $errors,
                '_notifications' => $notifications,
                '_trans' => [
                    'dashboard' => Lang::get('laravel-hubble::dashboard'),
                    'validation' => Lang::get('validation')
                ],
            ]);
        });
    }
}
