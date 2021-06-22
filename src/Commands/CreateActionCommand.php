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

    protected $signature = 'hubble:action {name} {--component= : The component to use when running this action}';

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

        $this->createActionComponent();
    }

    private function getData(?string $name)
    {
        $action = Str::studly($name);

        return [
            'namespace' => Hubble::getResourcesNamespace() . '\\Actions',
            'class_name' => $action,
            'name' => $action,
            'componentName' => $this->option('component') ?? 'confirm-action',
        ];
    }

    protected function createActionComponent()
    {
        $component = $this->option('component');
        if (!$component) return;

        $componentData = [
            'name' => Str::slug($component),
        ];

        $actionDirectory = "hubble" . DIRECTORY_SEPARATOR . "components" . DIRECTORY_SEPARATOR . "actions";
        $path = resource_path($actionDirectory . DIRECTORY_SEPARATOR . Str::slug($component) . '.vue');

        if (!File::exists(resource_path($actionDirectory))) {
            File::makeDirectory(resource_path($actionDirectory));
            $this->createStubFile('actions' . DIRECTORY_SEPARATOR . 'action-mixin.stub', [], resource_path($actionDirectory . DIRECTORY_SEPARATOR . "ActionMixin.js"));
        }

        $code = $this->createStubFile('actions' . DIRECTORY_SEPARATOR . 'action-component.stub', $componentData, $path);

        if ($code === -1) {
            $this->warn('Component js/hubble/components/actions/' . Str::slug($component) . ' already exists !');
            $this->warn('Abandon !');
            return;
        }

        $componentName = Str::slug($component);
        $chunkName = Str::contains('action', $componentName) ? $componentName : $componentName . '-action';

        $content = "window.Vue.component('$componentName', () => import(/* webpackChunkName: '$chunkName'*/ './components/actions/$componentName'));\n";
        File::append(resource_path('hubble' . DIRECTORY_SEPARATOR . 'components.js'), $content);

        $this->info("Component " . Str::slug($component) . " is successfully created at " . str_replace(base_path() . '/', '', $path));
    }
}
