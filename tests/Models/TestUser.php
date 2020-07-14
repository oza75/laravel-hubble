<?php


namespace Oza75\LaravelHubble\Tests\Models;


use Illuminate\Foundation\Auth\User;

class TestUser extends User
{
    protected $table = 'users';

    protected $guarded = [];
}
