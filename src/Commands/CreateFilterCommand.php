<?php


namespace Oza75\LaravelHubble\Commands;


use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Oza75\LaravelHubble\Commands\Concerns\HandlesStub;
use Oza75\LaravelHubble\Facades\Hubble;

class CreateFilterCommand extends Command
{
    use HandlesStub;

    protected $signature = 'hubble:filter {name} {--custom}';

    protected $description = 'Create a new hubble filter';

    public function handle()
    {
        $name = $this->argument('name');
        $custom = $this->option('custom');

        $data = [
            'namespace' => Hubble::getResourcesNamespace() . '\\Filters',
            'class_name' => Str::studly($name),
            'name' => Str::ucfirst(str_replace('_', ' ', Str::snake($name))),
            'component' => $custom ? Str::slug(Str::snake($name)) : 'hubble-checkbox-filter'
        ];

        $path = Hubble::getResourcesFolder() . 'Filters';

        if (!File::exists($path)) {
            File::makeDirectory($path);
        }
        $path .= '/' . $name . '.php';

        $code = $this->createStubFile('filter.stub', $data, $path);

        $base_path = str_replace(base_path() . '/', '', $path);

        if ($code === -1) {
            $this->warn("Filter $name already exists at $base_path");
            $this->warn("Abandon !");
            return;
        }

        if ($custom) $this->generateComponent(Str::slug(Str::snake($name)));

        $this->info("Filter $name is successfully created at $base_path");
    }

    private function generateComponent(string $name)
    {
        $data = ['name' => $name];
        $path = resource_path("hubble" . DIRECTORY_SEPARATOR . "components" . DIRECTORY_SEPARATOR . "filters");

        if (!File::exists($path)) File::makeDirectory($path, 0755, true);

        $this->createStubFile("filter-component.stub", $data, $path . DIRECTORY_SEPARATOR . $name . ".vue");

        $content = "window.Vue.component('$name', () => import(/* webpackChunkName: '$name'*/ './components/filters/{$name}.vue'));\n";
        File::append(resource_path('hubble' . DIRECTORY_SEPARATOR . 'components.js'), $content);

        $this->info($name . ' component created at ' . str_replace(base_path() .'/', '', $path . DIRECTORY_SEPARATOR . $name . ".vue"));
        $this->warn('Do not forget to run `npm run hubble:watch` or `npm run hubble:prod` to build the newly components !');
    }
}
