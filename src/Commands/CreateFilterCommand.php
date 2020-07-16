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

    protected $signature = 'hubble:filter {name}';

    protected $description = 'Create a new hubble filter';

    public function handle()
    {
        $name = $this->argument('name');

        $data = [
            'namespace' => Hubble::getResourcesNamespace() . '\\Filters',
            'class_name' => Str::studly($name),
            'name' => Str::ucfirst(str_replace('_', ' ', Str::snake($name))),
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

        $this->info("Filter $name is successfully created at $base_path");
    }
}
