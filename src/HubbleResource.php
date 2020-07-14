<?php


namespace Oza75\LaravelHubble;


use Oza75\LaravelHubble\Concerns\HandlesEvents;
use Oza75\LaravelHubble\Concerns\InteractsWithDatabase;
use Oza75\LaravelHubble\Contracts\Relations\HandleManyRelationship;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

abstract class HubbleResource
{
    use InteractsWithDatabase, HandlesEvents;

    protected $name = null;

    protected $title = null;

    protected $key = 'id';

    protected $searchColumns = [];

    protected $displayColumn;

    protected $loadedFields = [];

    protected $perPage = 38;

    /**
     * @return Field[] array of fields
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
     * @return null
     */
    public function getName()
    {
        return $this->name;
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
        $this->loadedFields = $this->fields();

        foreach ($this->loadedFields as $field) $field->prepare($this);
    }

    /***
     * @return Field[]
     */
    public function getLoadedFields()
    {
        return $this->loadedFields;
    }

    /**
     * @param string $section
     * @return array
     */
    public function toArray(string $section = 'index')
    {
        $data = [
            'key' => $this->key,
            'title' => $this->title,
            'searchable' => $this->searchable(),
            'urls' => $this->getUrls(),
            'fields' => $this->parseFields($section),
            'token' => csrf_token(),
        ];

        switch ($section) {
            case 'index':
                $data = array_merge($data, $this->indexingToArray());
                break;
            case 'creating':
                $data = array_merge($data, $this->creatingToArray());
                break;
            case 'editing':
                $data = array_merge($data, $this->editingToArray());
                break;
            case 'details':
                $data['relatedResource'] = $this->getRelatedResources();
                break;
        }

        return $data;
    }

    /**
     * @return array
     */
    protected function creatingToArray()
    {
        return [];
    }

    /**
     * @return array
     */
    protected function editingToArray()
    {
        return [];
    }

    /**
     * @return array
     */
    protected function indexingToArray()
    {
        $actions = collect($this->actions())->map(function (Action $action) {
            return array_merge($action->toArray(), [
                'url' => route('api.hubble.action', ['name' => $this->name, 'action' => $action->getName()])
            ]);
        })->toArray();

        $filters = collect($this->filters())->map(function (Filter $filter) {
            return $filter->toArray();
        })->toArray();

        return ['actions' => $actions, 'filters' => $filters];
    }

    /**
     * @param string $section
     * @return array
     */
    private function parseFields(string $section = 'index')
    {
        return collect($this->getVisibleFields($section))->mapWithKeys(function (Field $field) use ($section) {
            return $field->toArray($section);
        })->toArray();
    }

    /**
     * @param string $section
     * @return array
     */
    public function getVisibleFields(string $section)
    {
        return collect($this->loadedFields)->filter(function (Field $field) use ($section) {
            return $field->isVisibleOn($section);
        })->toArray();
    }

    /**
     * @param string $name
     * @param Request $request
     */
    public function runAction(string $name, Request $request)
    {
        $action = $this->getActionByName($name);
        if (is_null($action)) abort(404);

        $request->validate(['items' => 'required']);
        $ids = $request->get('items');

        $action->run($ids);
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
        return $this->title;
    }

    /**
     * @param $resource
     * @return array
     */
    public function resolveItemUrls($resource)
    {
        return [
            'show' => route('hubble.show', ['name' => $this->name, 'key' => $resource->{$this->key}]),
            'update' => route('hubble.update', ['name' => $this->name, 'key' => $resource->{$this->key}]),
            'edit' => route('hubble.edit', ['name' => $this->name, 'key' => $resource->{$this->key}]),
            'delete' => route('api.hubble.delete', ['name' => $this->name, 'key' => $resource->{$this->key}])
        ];
    }

    /**
     * @param Request $request
     * @return string
     */
    public function createItem(Request $request)
    {
        $data = $this->retrieveFormData($request, 'creating');

        $item = $this->create($data, $request);

        return route('hubble.show', ['name' => $this->name, 'key' => $item->{$this->key}]);
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function updateItem(Request $request, $id)
    {
        $data = $this->retrieveFormData($request, 'editing');

        return $this->update($id, $data, $request);
    }

    /**
     * @return array
     */
    protected function urls()
    {
        return [
            'create' => route('hubble.create', ['name' => $this->name]),
            'store' => route('hubble.store', ['name' => $this->name]),
            'index' => route('hubble.index', ['name' => $this->name]),
            'api' => [
                'index' => route('api.hubble.index', ['name' => $this->name]),
            ],
        ];
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
        $fields = collect($this->loadedFields)->filter(function (Field $field) use ($request, $section) {
            return $field->isVisibleOn($section);
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
        $field = collect($this->loadedFields)->first(function (Field $item) use ($field) {
            return $item->getName() === $field;
        });

        if (is_null($field)) abort(404);

        return $field->getRelatedOptions($request);
    }

    /**
     * @return Collection
     */
    protected function getRelatedResources()
    {
        return collect($this->getLoadedFields())
            ->filter(function (Field $field) {
                return $field instanceof HandleManyRelationship;
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
        $field = collect($this->getLoadedFields())
            ->first(function (Field $item) use ($name) {
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

}
