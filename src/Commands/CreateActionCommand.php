<?php


namespace Oza75\LaravelHubble\Commands;


use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Oza75\LaravelHubble\Commands\Concerns\HandlesStub;
use Oza75\LaravelHubble\Facades\Hubble;

class CreateActionCommand extends Command
{
    use HandlesStub;

    protected $signature = 'hubble:action {name}';

    protected $description = 'Create a hubble action';

    public function handle()
    {
        $name = $this->argument('name');
        $data = $this->getData($name);

        $folder = Hubble::getResourcesFolder() . 'Actions' . DIRECTORY_SEPARATOR;
        $path = $folder . Str::studly($name) . '.php';

        if (!File::exists($folder)) {
            File::makeDirectory($folder);
        }

        $code = $this->createStubFile('action.stub', $data, $path);

        if ($code === -1) {
            $this->warn('Action ' . Str::studly($name) . ' already exists !');
            $this->warn('Abandon !');
            return;
        }

        $this->info("Action " . Str::studly($name) . " is successfully created at " . str_replace(base_path() . '/', '', $path));
    }

    private function getData(?string $name)
    {
        $action = Str::studly($name);

        return [
            'namespace' => Hubble::getResourcesNamespace() . '\\Actions',
            'class_name' => $action,
            'name' => $action
        ];
    }
}
