<?php

namespace Oza75\LaravelHubble\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Oza75\LaravelHubble\Commands\Concerns\HandlesStub;
use Oza75\LaravelHubble\Facades\Hubble;

class CreateFieldCommand extends Command
{
    use HandlesStub;

    protected $signature = 'hubble:field {name}';

    protected $description = 'Create a new hubble field';

    public function handle()
    {
        $name = $this->argument('name');

        $data = [
            'namespace' => Hubble::getResourcesNamespace() . '\\Fields',
            'class_name' => Str::studly($name),
        ];

        $path = Hubble::getResourcesFolder() . 'Fields';

        if (!File::exists($path)) {
            File::makeDirectory($path);
        }
        $path .= '/' . $name . '.php';

        $code = $this->createStubFile('field.stub', $data, $path);

        $base_path = str_replace(base_path() . '/', '', $path);

        if ($code === -1) {
            $this->warn("Field $name already exists at $base_path");
            $this->warn("Abandon !");
            return;
        }

        $this->info("Field $name is successfully created at $base_path");
    }
}
