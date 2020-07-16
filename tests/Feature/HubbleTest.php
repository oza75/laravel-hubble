<?php


namespace Oza75\LaravelHubble\Tests\Feature;


use Illuminate\Foundation\Application;
use Illuminate\Support\Str;
use LogicException;
use Oza75\LaravelHubble\Facades\Hubble;
use Oza75\LaravelHubble\Tests\TestCase;
use Oza75\LaravelHubble\Tests\TestResources\NotAResource;
use Oza75\LaravelHubble\Tests\TestResources\TestUserResource;

class HubbleTest extends TestCase
{
    private $path;
    private $namespace;

    public function __construct($name = null, array $data = [], $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
        $this->path = Str::finish(realpath(__DIR__ . '/../TestResources'), '/');
        $this->namespace = 'Oza75\LaravelHubble\Tests\TestResources';
    }

    /**
     * Define environment setup.
     *
     * @param Application $app
     * @return void
     */
    protected function getEnvironmentSetUp($app)
    {
//        $app['config']->set('laravel-hubble.resources_folder', realpath(__DIR__ . '/../TestResources'));
//        $app['config']->set('laravel-hubble.resources_namespace', 'Oza75\LaravelHubble\Tests\TestResources');
    }

    public function test_it_can_set_resource_path()
    {
        Hubble::setResourcesFolder($this->path, $this->namespace);

        $this->assertEquals($this->path, Hubble::getResourcesFolder());
    }

    public function test_can_auto_register_resources()
    {
        Hubble::setResourcesFolder($this->path, $this->namespace);
        Hubble::autoRegisterResources();

        $this->assertNotEmpty(Hubble::getResources());
        $this->assertTrue(collect(Hubble::getResources())->contains(TestUserResource::class));
        $this->assertTrue(collect(Hubble::getBooted())->has(TestUserResource::class));
        $this->assertFalse(collect(Hubble::getResources())->contains(NotAResource::class));
    }

    public function test_do_not_auto_register_resources_when_auto_discovering_is_disable()
    {
        Hubble::setResourcesFolder($this->path, $this->namespace);
        Hubble::disableAutoDiscovering();
        Hubble::autoRegisterResources();

        $this->assertEmpty(Hubble::getResources());
        $this->assertFalse(collect(Hubble::getResources())->contains(TestUserResource::class));
        $this->assertFalse(collect(Hubble::getResources())->contains(NotAResource::class));
    }

    public function test_fails_when_trying_to_set_resources_namespaces_after_disabled_auto_discovering()
    {
        $this->expectException(LogicException::class);
        Hubble::disableAutoDiscovering();
        Hubble::setResourcesFolder($this->path, $this->namespace);
    }

    public function test_can_add_new_resource_manually()
    {
        Hubble::addResource(TestUserResource::class);

        $this->assertTrue(collect(Hubble::getResources())->contains(TestUserResource::class));
        $this->assertTrue(collect(Hubble::getBooted())->has(TestUserResource::class));
    }

    public function test_can_set_resources_manually()
    {
        Hubble::setResources([TestUserResource::class]);

        $this->assertTrue(collect(Hubble::getResources())->contains(TestUserResource::class));
        $this->assertTrue(collect(Hubble::getBooted())->has(TestUserResource::class));
    }

    public function test_can_add_resources_manually()
    {
        Hubble::addResources([TestUserResource::class]);

        $this->assertTrue(collect(Hubble::getResources())->contains(TestUserResource::class));
        $this->assertTrue(collect(Hubble::getBooted())->has(TestUserResource::class));
    }
}
