<?php


namespace Oza75\LaravelHubble\Commands;


use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Oza75\LaravelHubble\Commands\Concerns\HandlesStub;
use Oza75\LaravelHubble\Facades\Hubble;

class CreateResourceCommand extends Command
{
    use HandlesStub;

    protected $signature = 'hubble:resource {name}';

    protected $description = 'create a new hubble resource';


    public function handle()
    {
        $name = $this->argument('name');

        $data = $this->getData($name);

        $realName = preg_replace('/[r|R]esource/', '', $name);
        $path = Hubble::getResourcesFolder() . Str::studly($realName) . 'Resource.php';
        $code = $this->createStubFile('resource.stub', $data, $path);

        if ($code === -1) {
            $this->warn($realName . 'Resource already exists.');
            $this->warn('Abandon !');
            return;
        }

        $this->info($realName . 'Resource is successfully created at ' . str_replace(base_path() . '/', '', $path));
    }

    private function getData(?string $name)
    {
        $name = Str::studly(preg_replace('/[rR]esource/', '', $name));
        $modelClass = '\\App\\'. (is_dir(app_path('Models')) ? 'Models\\' : '') . $name;
        return [
            'namespace' => Hubble::getResourcesNamespace(),
            'model_class' => $modelClass,
            'class_name' => Str::studly($name),
            'title' => Str::plural($name),
            'name' => Str::lower(Str::plural($name)),
            'snake_name' => str_replace('_', ' ', Str::snake($name)),
        ];
    }
}
