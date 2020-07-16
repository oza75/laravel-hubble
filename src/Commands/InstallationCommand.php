<?php


namespace Oza75\LaravelHubble\Commands;


use HaydenPierce\ClassFinder\ClassFinder;
use Illuminate\Console\Command;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Oza75\LaravelHubble\Commands\Concerns\HandlesStub;
use Oza75\LaravelHubble\Facades\Hubble;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Laravel\Ui\UiServiceProvider;

class InstallationCommand extends Command
{
    use HandlesStub;

    protected $signature = "hubble:install";

    protected $description = 'Install hubble command';

    /**
     * @throws BindingResolutionException
     */
    public function handle()
    {
        $this->checkAuthRouteExistence();
    }

    /**
     * @throws BindingResolutionException
     */
    private function checkAuthRouteExistence()
    {
        $router = app()->make(Router::class);

        if (!$router->has('login') || !$router->has('logout')) {
            $this->warn("You do not have a login or a logout route.");

            if (!$this->uiPackageIsAlreadyInstalled()) {
                $this->installLaravelUiPackage();
            } else {
                $this->warn('You need to add a login and logout route !');
            }
        }

        $this->publishPublicAssets();
        $this->createHubbleDirectory();
        $this->createBaseResource();

        $this->info('Laravel Hubble is successfully installed !');
        $url = route('hubble.home');
        $this->line("Open hubble in browser : $url");
    }

    private function installLaravelUiPackage()
    {
        $this->warn("Please consider using laravel/ui package in order to register those route or manually register those routes");

        if (!$this->confirm('Do you want to use laravel/ui package ? ')) {
            $this->warn("You need to add login and logout routes.");
            return;
        }

        $process = Process::fromShellCommandline('composer require laravel/ui', null, null, null, null);
        $this->line("Installing laravel/ui package using composer require laravel/ui ! Please wait...");
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $this->info($process->getOutput());

        $this->call('ui:auth');
    }

    private function publishPublicAssets()
    {
        $this->call('vendor:publish', [
            "--provider" => "Oza75\LaravelHubble\HubbleServiceProvider",
            "--tag" => "public",
        ]);
    }

    /**
     * @return mixed
     */
    private function uiPackageIsAlreadyInstalled()
    {
        return app()->providerIsLoaded(UiServiceProvider::class);
    }

    private function createHubbleDirectory()
    {
        $folder = Hubble::getResourcesFolder();
        if (!File::exists($folder)) {
            File::makeDirectory($folder);
        }
    }

    private function createBaseResource()
    {
        $data = [
            'namespace' => Hubble::getResourcesNamespace()
        ];

        $path = Hubble::getResourcesFolder() . DIRECTORY_SEPARATOR . 'Resource.php';

        $this->createStubFile('base_resource.stub', $data, $path);
    }
}
