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

    protected $signature = 'hubble:field {name} {--custom}';

    protected $description = 'Create a new hubble field';

    public function handle()
    {
        $name = $this->argument('name');
        $custom = $this->option('custom');

        $data = [
            'namespace' => Hubble::getResourcesNamespace() . '\\Fields',
            'class_name' => Str::studly($name),
            'field' => $custom ? Str::slug(Str::snake(preg_replace('/[fF]ield/', '', $name))) : 'text'
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
        if ($custom) $this->generateComponents($name, $path);

        $this->info("Field $name is successfully created at $base_path");
    }

    private function generateComponents(string $name, string $path)
    {
        $field = Str::slug(Str::snake(preg_replace('/[fF]ield/', '', $name)));
        $data = ['field' => $field];

        $path = resource_path("hubble" . DIRECTORY_SEPARATOR . "components" . DIRECTORY_SEPARATOR . "fields" . DIRECTORY_SEPARATOR . $field);

        if (!File::exists($path))
            File::makeDirectory($path, 0755, true);

        $this->createStubFile('fields' . DIRECTORY_SEPARATOR . 'edit.stub', $data, $path . DIRECTORY_SEPARATOR . 'edit-' . $field . '-field.vue');
        $this->createStubFile('fields' . DIRECTORY_SEPARATOR . 'index.stub', $data, $path . DIRECTORY_SEPARATOR . 'index-' . $field . '-field.vue');
        $this->createStubFile('fields' . DIRECTORY_SEPARATOR . 'show.stub', $data, $path . DIRECTORY_SEPARATOR . 'show-' . $field . '-field.vue');

        $components = ['edit', 'index', 'show'];

        foreach ($components as $component) {
            $this->createStubFile('fields' . DIRECTORY_SEPARATOR . $component . '.stub', $data, $path . DIRECTORY_SEPARATOR . $component . '-' . $field . '-field.vue');
            $componentName = $component . '-' . $field;
            $content = "window.Vue.component('$componentName-field', () => import(/* webpackChunkName: '$componentName-field'*/ './components/fields/$field/$componentName-field'));\n";
            File::append(resource_path('hubble' . DIRECTORY_SEPARATOR . 'components.js'), $content);
        }

        $this->info($name . ' components created at ' . str_replace(base_path() .'/', '', $path));
        $this->warn('Do not forget to run `npm run hubble:watch` or `npm run hubble:prod` to build the newly components !');
    }
}
