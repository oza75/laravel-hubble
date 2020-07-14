<?php


namespace Oza75\LaravelHubble\Tests\Feature;


use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Oza75\LaravelHubble\Tests\TestCase;

class AuthentificationTest extends TestCase
{

    public function test_redirect_to_form_when_not_logged()
    {
        $response = $this->get(route('hubble.home'));
        $response->assertRedirect(route('hubble.login'));
    }

    public function test_redirect_to_form_when_gate_not_passed()
    {
        Gate::define('viewHubble', function (User $user) {
            return false;
        });

        $user = $this->createUser();
        $response = $this->actingAs($user)->get(route('hubble.home'));
        $response->assertRedirect(route('hubble.login'));
    }

    public function test_can_access_to_hubble_when_authentification_passed()
    {
        Gate::define('viewHubble', function (User $user) {
            return true;
        });

        Route::get('logout', function () {})->middleware('web')->name('logout');

        $user = $this->createUser();
        $this->withoutExceptionHandling();
        $response = $this->actingAs($user)->get(route('hubble.home'));
        $response->assertOk();
    }
}
