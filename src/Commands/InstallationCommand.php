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

        $this->publishPublicAssets();
        $this->createHubbleDirectory();
        $this->createBaseResource();
        $this->createHubbleWebpackMix();

        $this->info('Laravel Hubble is successfully installed !');
        $url = route('hubble.home');
        $this->line("Open hubble in browser : $url");
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
//            "--tag" => "public",
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

    private function createHubbleWebpackMix()
    {
        $path = base_path('hubble-webpack.mix.js');

        $this->createDefaultResources();

        if (!File::exists($path)) {
            $this->createStubFile('hubble-webpack.mix.stub', [], $path);
            $content = "if (process.env.hubble) {\n\trequire('./hubble-webpack.mix.js');\n\treturn;\n}\n\n";
            File::prepend(base_path('webpack.mix.js'), $content);
            $this->updatePackageJson();
            $this->info('hubble-webpack.mix.js config file is created !');
        }
    }

    private function updatePackageJson()
    {
        $content = File::get(base_path('package.json'));
        $package = json_decode($content, true);
        $scripts = [
            'hubble:dev' => "cross-env NODE_ENV=development process.env.hubble=true node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
            "hubble:watch" => "cross-env NODE_ENV=development process.env.hubble=true node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js --watch",
            "hubble:prod" => "cross-env NODE_ENV=production process.env.hubble=true node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
        ];
        $packageScripts = $package['scripts'] ?? [];
        $packageScripts = array_merge($packageScripts, $scripts);
        $package['scripts'] = $packageScripts;
        File::put(base_path('package.json'), json_encode($package, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $this->info('package.json file updated !');
    }

    private function createDefaultResources()
    {
        $path = resource_path('hubble');

        if (!File::isDirectory($path)) File::makeDirectory($path);
        if (!File::isDirectory($path . DIRECTORY_SEPARATOR . "components")) File::makeDirectory($path . DIRECTORY_SEPARATOR . "components");

        if (!File::exists($path . DIRECTORY_SEPARATOR . "components.js"))
            $this->createStubFile('components.stub', [], $path . DIRECTORY_SEPARATOR . "components.js");

        if (!File::exists($path . DIRECTORY_SEPARATOR . "components.scss"))
            File::put($path . DIRECTORY_SEPARATOR . "components.scss", "");

        if (!File::exists($path . DIRECTORY_SEPARATOR . "rules.js"))
            $this->createStubFile('rules.stub', [], $path . DIRECTORY_SEPARATOR . "rules.js");
    }
}
