<?php


namespace Oza75\LaravelHubble\Tests;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Orchestra\Testbench\TestCase as BaseTestCase;
use Oza75\LaravelHubble\Facades\Hubble;
use Oza75\LaravelHubble\HubbleServiceProvider;
use Oza75\LaravelHubble\Tests\Models\TestUser;

class TestCase extends BaseTestCase
{

    protected function getPackageProviders($app)
    {
        return [HubbleServiceProvider::class];
    }

    protected function getPackageAliases($app)
    {
        return ['Hubble' => Hubble::class];
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->loadLaravelMigrations();
    }

    /**
     * @param array $attributes
     * @return Builder|Model
     */
    protected function createUser(array $attributes = [])
    {
        $attributes = array_merge([
            'name' => 'Test User',
            'email' => 'hello@world.com',
            'password' => 'secret'
        ], $attributes);

        return TestUser::query()->create($attributes);
    }
}
