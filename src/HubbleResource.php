<?php


namespace Oza75\LaravelHubble;


use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Oza75\LaravelHubble\Concerns\HandlesAuthorization;
use Oza75\LaravelHubble\Concerns\HandlesConfiguration;
use Oza75\LaravelHubble\Concerns\HandlesEvents;
use Oza75\LaravelHubble\Concerns\InteractsWithDatabase;
use Oza75\LaravelHubble\Configuration\Configuration;
use Oza75\LaravelHubble\Configuration\ScreenConfiguration;
use Oza75\LaravelHubble\Contracts\HasVisibility;
use Oza75\LaravelHubble\Contracts\Relations\HandleManyRelationship;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Oza75\LaravelHubble\TableButtons\ExportButton;

abstract class HubbleResource
{
    use InteractsWithDatabase, HandlesAuthorization, HandlesEvents, HandlesConfiguration;

    const NULL_VALUE = "__laravel__hubble@null#";

    protected $name = null;

    protected $title = null;

    protected $key = 'id';

    protected $searchColumns = [];

    protected $displayColumn;

    /** @var FieldCollection */
    public $fieldCollection;

    /** @var int Number of records per page */
    protected $perPage = 38;

    /** @var bool Determines if a resource should be shown in sidebar */
    protected $displayInSidebar = true;

    /**
     * @var bool Determines if a resource can be exported in excel format.
     */
    protected $exportable = true;

    private $currentItem = null;

    /**
     * @return Field[]  array of fields
     */
    public abstract function fields();

    /**
     * @return Action[] array of actions
     */
    public abstract function actions();

    /**
     * @return Filter[] array of filters
     */
    public abstract function filters();


    /**
     * @return Builder
     */
    public abstract function baseQuery(): Builder;

    /**
     * @return TableButton[] array of buttons
     */
    public function tableButtons()
    {
        return [
            TableButton::make(
                trans('laravel-hubble::dashboard.create'),
                route('hubble.create', ['name' => $this->getName()])
            )->displayWhen(function (User $user) {
                return $this->canAccess('create', get_class($this->getModel()));
            }),
            $this->exportButton(),
        ];
    }

    protected function exportButton(): ExportButton
    {
        return ExportButton::make($this->getName())->displayWhen(function (User $user) {
            return $this->exportable;
        });
    }

    /**
     * @return Panel[]
     */
    public function panels()
    {
        return [];
    }

    /**
     * @return null
     */
    public function getName()
    {
        if ($this->name)
            return $this->name;

        $defaultName = preg_replace('/[rR]esource/', '', class_basename($this));

        return Str::kebab(Str::plural($defaultName));
    }

    /**
     * @return bool
     */
    public function searchable(): bool
    {
        return !empty($this->searchColumns);
    }

    public function boot()
    {
        $this->fieldCollection = FieldCollection::make($this, $this->fields());
    }

    /**
     * @param string $section
     * @return array
     */
    public function toArray(string $section = 'index')
    {
        $data = [
            'key' => $this->key,
            'title' => $this->getTitle(),
            'searchable' => $this->searchable(),
            'urls' => $this->getUrls(),
            'config' => $this->buildConfiguration($section),
            'fields' => $this->fieldCollection->build($section),
            'panels' => $this->getPanels($section),
            'token' => csrf_token(),
        ];

        switch ($section) {
            case 'index':
                $data = array_merge($data, $this->toArrayWhenIndexing());
                break;
            case 'creating':
                $data = array_merge($data, $this->toArrayWhenCreating());
                break;
            case 'editing':
                $data = array_merge($data, $this->toArrayWhenEditing());
                break;
            case 'details':
                $data['actions'] = $this->getActions($section);
                $data['relatedResource'] = $this->getRelatedResources($section);
                break;
        }

        return $data;
    }

    /**
     * @return array
     */
    protected function toArrayWhenCreating()
    {
        return [];
    }

    /**
     * @return array
     */
    protected function toArrayWhenEditing()
    {
        return [];
    }

    /**
     * @return array
     */
    protected function toArrayWhenIndexing()
    {
        $actions = $this->getActions('index');

        $filters = collect($this->filters())->map(function (Filter $filter) {
            return $filter->toArray();
        })->toArray();

        $buttons = collect($this->tableButtons())->filter(function (TableButton $button) {
            return $button->isVisible();
        })->map(function (TableButton $button) {
            return $button->toArray();
        })->toArray();

        return ['actions' => $actions, 'filters' => $filters, 'buttons' => $buttons];
    }

    /**
     * @param string $name
     * @param Request $request
     * @return array|string|void|null
     */
    public function runAction(string $name, Request $request)
    {
        $action = $this->getActionByName($name);
        if (is_null($action)) abort(404);

        $action->boot($this);

        $request->validate(['items' => 'required']);
        $ids = $request->get('items');

        $models = $this->baseQuery()->whereIn($this->getModel()->getTable().".". $this->getModel()->getKeyName(), $ids)->cursor();

        $message = $action->run($models, $this->baseQuery());

        if (!$message) return null;

        if (is_array($message)) return $message;

        return ['message' => $message, 'state' => 'success'];
    }

    /**
     * @param string $name
     * @return Action|null
     */
    private function getActionByName(string $name)
    {
        return collect($this->actions())->first(function (Action $action) use ($name) {
            return $action->getName() === $name;
        });
    }

    /**
     * @return null
     */
    public function getTitle()
    {
        return $this->title ?? $this->getName();
    }

    /**
     * @param $resource
     * @return array
     */
    public function resolveItemUrls($resource)
    {
        return [
            'show' => route('hubble.show', ['name' => $this->getName(), 'key' => $resource->{$this->key}]),
            'update' => route('hubble.update', ['name' => $this->getName(), 'key' => $resource->{$this->key}]),
            'edit' => route('hubble.edit', ['name' => $this->getName(), 'key' => $resource->{$this->key}]),
            'delete' => route('api.hubble.delete', ['name' => $this->getName(), 'key' => $resource->{$this->key}])
        ];
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function createItem(Request $request)
    {
        $data = $this->retrieveFormData($request, 'creating');

        $request->validate($this->fieldCollection->rules('creating'));

        $item = $this->create($data, $request);

        session()->flash('notification', ['message' => trans('laravel-hubble::dashboard.created'), 'state' => 'success']);

        return redirect()->route('hubble.show', ['name' => $this->getName(), 'key' => $item->{$this->key}]);
    }

    /**
     * @param $item
     * @param Request $request
     * @return mixed
     * @throws Exception
     */
    public function updateItem($item, Request $request)
    {
        $data = $this->retrieveFormData($request, 'editing');

        $updated = $this->update($item, $data, $request);

        session()->flash('notification', ['message' => trans('laravel-hubble::dashboard.updated'), 'state' => 'success']);

        return $updated;
    }

    /**
     * @return array
     */
    protected function urls()
    {
        $urls = [
            'create' => route('hubble.create', ['name' => $this->getName()]),
            'store' => route('hubble.store', ['name' => $this->getName()]),
            'index' => route('hubble.index', ['name' => $this->getName()]),
            'api' => [
                'index' => route('api.hubble.index', ['name' => $this->getName()]),
            ],
        ];

        if (!is_null($this->currentItem)) {
            $urls['api']['show'] = route('api.hubble.show', ['name' => $this->getName(), 'key' => $this->currentItem->{$this->key}]);
        }

        return $urls;
    }

    /**
     * @return array
     */
    private function getUrls()
    {
        $urls = $this->urls();

        return collect($urls)->map(function ($value, $key) {
            if ($key === 'api' || is_array($value))
                return $value;

            return [
                'url' => $value
            ];
        })->toArray();
    }

    /**
     * @param Request $request
     * @param string $section
     * @return array
     */
    public function retrieveFormData(Request $request, string $section): array
    {
        $allFields = array_merge($this->fieldCollection->all(), collect($this->panels())
            ->filter(function (Panel $panel) use ($section) {
                return $panel->isVisibleOn($section);
            })->map(function (Panel $panel) {
                return $panel->getFields();
            })->flatten()->toArray());

        $fields = collect($allFields)->filter(function (Field $field) use ($request, $section) {
            return $field->isVisibleOn($section) && !$field instanceof HandleManyRelationship;
        });

        return $fields->mapWithKeys(function (Field $field) use ($request, $section) {
            return [$field->getName() => $field->retrieveFormData($request, $section)];
        })->toArray();
    }

    /**
     * @return string
     */
    public function getDisplayColumn(): string
    {
        return $this->displayColumn ?? $this->key;
    }

    /**
     * @return string
     */
    public function getKey(): string
    {
        return $this->key;
    }

    /**
     * @param $field
     * @param Request $request
     * @return mixed
     */
    public function getRelatedFieldOptions($field, Request $request)
    {
        $field = $this->fieldCollection->first(function (Field $item) use ($field) {
            return $item->getName() === $field;
        });

        if (is_null($field)) abort(404);

        return $field->getRelatedOptions($request);
    }

    /**
     * @param string $section
     * @return Collection
     * @throws Exception
     */
    protected function getRelatedResources(string $section)
    {
        return $this->fieldCollection->filter(function (Field $field) use ($section) {
            return $field instanceof HandleManyRelationship
                && $field->isVisibleOn($section)
                && $this->canAccess('index', $field->getRelatedResource()->getModel());
        })->map(function (Field $field) {
            return $field->getRelatedResource()->toArray();
        })->values();
    }

    /**
     * @return array
     */
    public function getSearchColumns(): array
    {
        return $this->searchColumns;
    }

    /**
     * @param $name
     * @return mixed
     */
    public function getRelatedFieldResource($name)
    {
        $field = $this->fieldCollection->first(function (Field $item) use ($name) {
            return $item instanceof HandleManyRelationship && $item->getName() === $name;
        });

        if (is_null($field)) abort(404);

        return $field->getRelatedResource();
    }

    /**
     * @param int $perPage
     * @return HubbleResource
     */
    public function setPerPage(int $perPage): HubbleResource
    {
        $this->perPage = $perPage;
        return $this;
    }

    /**
     * @return int
     */
    public function getPerPage(): int
    {
        return $this->perPage;
    }

    /**
     * @return bool
     * @throws Exception
     */
    public function isAccessible()
    {
        return $this->displayInSidebar && $this->canAccess('index', get_class($this->getModel()));
    }

    /**
     * @param string $section
     * @return array
     */
    protected function getActions(string $section = 'index'): array
    {
        return collect($this->actions())
            ->filter(function (Action $action) use ($section) {
                $action->boot($this);
                /** @var User */
                $user = auth()->user();
                return $action->can($user, $this->currentItem) && $action->visiblesIn($section);
            })
            ->map(function (Action $action) {
                return array_merge($action->toArray(), [
                    'url' => $action->url()
                ]);
            })
            ->values()
            ->toArray();
    }

    /**
     * @param null $currentItem
     * @return HubbleResource
     */
    public function setCurrentItem($currentItem)
    {
        $this->currentItem = $currentItem;
        return $this;
    }

    /**
     * @return null
     */
    public function getCurrentItem()
    {
        return $this->currentItem;
    }

    /**
     * @return Builder|Model
     */
    public function getModel()
    {
        return $this->baseQuery()->getModel();
    }

    private function getPanels(string $section)
    {
        return collect($this->panels())->filter(function (Panel $panel) use ($section) {
            return $panel->isVisibleOn($section);
        })->map(function (Panel $panel) use ($section) {
            $panel->prepare($this);
            return $panel->toArray($section);
        })->toArray();
    }

    public function configure(Configuration $configuration)
    {
        $configuration->details(function (ScreenConfiguration $configuration, $model) {
            /** @var string $title */
            $title = $this->getTitle();
            $configuration->setTitle(Str::singular($title) ." #". $model->id);
        });
    }
}
