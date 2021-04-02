<?php


namespace Oza75\LaravelHubble\Fields;

use Oza75\LaravelHubble\Concerns\Relations\HasRelationships;
use Oza75\LaravelHubble\Contracts\Relations\HandleManyRelationship;
use Oza75\LaravelHubble\HubbleResource;
use Oza75\LaravelHubble\RelatedResource;
use Oza75\LaravelHubble\Resource;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * Class HasManyField
 * @method static HasManyField make(string $method_name, string $related, ?string $title = null, ?bool $sortable = false)
 * @package Oza75\Hubble\Fields
 */
class HasManyField extends SelectField implements HandleManyRelationship
{
    use HasRelationships;

    protected $perPage = null;
    /**
     * @var bool[]
     */
    protected $visibility = [
        'index' => true,
        'editing' => false,
        'creating' => false,
        'details' => true,
        'export' => true,
    ];

    /**
     * HasManyField constructor.
     * @param string $methodName
     * @param string $related
     * @param string|null $title
     * @param bool $sortable
     */
    public function __construct(string $methodName, string $related, ?string $title = null, ?bool $sortable = false)
    {
        $this->related = $related;

        parent::__construct($methodName, $title ?? Str::title($methodName), [], $sortable);

        $this->methodName = $methodName;
    }

    public function boot(HubbleResource $resource)
    {
        parent::boot($resource);

        [$model, $relationship] = $this->getRelationship();

        $related = $this->newRelatedInstance();

        $relatedModel = $relationship->getRelated();

        $this->setValueKey($relatedModel->getKeyName());
        $this->setTextKey($related->getDisplayColumn());
        $this->addProp('multiple', true);
        $this->placeholder(trans('laravel-hubble::dashboard.associate_placeholder', ['title' => Str::plural($this->title)]));

        $displayResolver = function ($value, $resource) use ($related) {
            return $value->map(function ($item) use ($related, $resource) {
                $urls = $related->resolveItemUrls($item);
                $url = $urls['show'];

                $url = is_array($url) ? $url['url'] : $url;
                $target = is_array($url) ? $url['target'] : '_self';

                $name = $item->{$related->getDisplayColumn()};

                return "<a href='$url' target='$target' class='default--color'>$name</a>";
            })->join(', ');
        };

        $this->displayOnIndexUsing($displayResolver);
    }

    /**
     * @param string $section
     * @return array[]
     */
    public function toArray(string $section = 'index')
    {
        if (in_array($section, ['creating', 'editing'])) {
            $this->options = route('api.hubble.fields.related',
                [
                    'name' => $this->resource->getName(),
                    'key' => request()->route('key'),
                    'field' => $this->name
                ]);
        }

        return parent::toArray($section);
    }

    /**
     * @return array
     */
    private function getRelationship()
    {
        $model = $this->getModel();

        $relationship = $model->{$this->methodName}();

        return [$model, $relationship];
    }

    /**
     * @param Request $request
     * @param string $section
     * @return mixed|null
     */
    public function retrieveFormData(Request $request, string $section)
    {
        [$model, $relationship] = $this->getRelationship();

        $eventName = ['creating' => 'created', 'editing' => 'updated'][$section] ?? null;
        if (is_null($eventName)) return null;

        $this->persists($eventName, $request, $relationship);

        return null;
    }

    /**
     * @param string $eventName
     * @param Request $request
     * @param HasMany $relationship
     */
    private function persists(string $eventName, Request $request, HasMany $relationship)
    {
        $ids = $request->get($this->name);

        $this->resource->registerEvent($eventName, function ($item) use ($ids, $relationship) {
            $query = $relationship->getRelated()->newQuery()->withoutGlobalScopes();

            $query->where($relationship->getForeignKeyName(), $item->{$relationship->getLocalKeyName()})
                ->whereNotIn($relationship->getRelated()->getKeyName(), $ids)
                ->update([$relationship->getForeignKeyName() => null]);

            $query->whereIn($relationship->getRelated()->getKeyName(), $ids)
                ->update([$relationship->getForeignKeyName() => $item->{$relationship->getLocalKeyName()}]);
        });
    }

    /**
     * @param callable|null $when
     * @return $this|HasManyField
     */
    public function onlyOnDetails(?callable $when = null)
    {
        $this->hideOnForms($when);
        $this->hideOnIndex($when);

        return $this;
    }

    /**
     * @return HubbleResource
     */
    public function getRelatedResource(): HubbleResource
    {
        $resource = $this->newRelatedInstance();
        $resource->boot();

        $key = request()->route('key');
        $model = $this->resource->baseQuery()->where($this->resource->getKey(), $key)->firstOrFail();
        $relationship = $model->{$this->methodName}();

        $newResource = new RelatedResource($resource, $this->resource, $model, $this, $relationship);
        $newResource->boot();

        return $newResource;
    }

    /**
     * @param null $perPage
     * @return HasManyField
     */
    public function setPerPage($perPage)
    {
        $this->perPage = $perPage;
        return $this;
    }

    /**
     * @return null
     */
    public function getPerPage()
    {
        return $this->perPage;
    }

    public function getRelatedOptions(Request $request)
    {
        $id = $request->route('key');

        $model = $this->getModel()->newQuery()->where($this->resource->getKey(), $id)->firstOrFail();

        $relatedResource = $this->newRelatedInstance();

        $relationship = $model->{$this->methodName}()
            ->newQuery()
            ->withoutGlobalScopes();

        $related = $relationship->getRelated();

        $keyName = $related->getTable() . '.' . $relatedResource->getKey();
        $relationship->select($keyName);

        $query = $related->newQuery();

        if ($search = $request->get('search', null)) {
            $query->whereRaw('lower(' . $relatedResource->getDisplayColumn() . ') like ?', ['%' . Str::lower($search) . '%']);
        }

        $query->whereRaw($keyName . ' not in (' . $relationship->toSql() . ')');
        $query->mergeBindings($relationship->toBase());

        $data = $query->paginate();
        $items = $data->items();

        $url = route('api.hubble.related.attach', [
            'name' => $this->resource->getName(),
            'key' => $id,
            'field' => $this->getName()
        ]);

        $items = collect($items)->map(function ($item) use ($url) {
            $item['attach_url'] = $url;
            return $item;
        });

        return [
            'data' => $items,
            'current_page' => $data->currentPage(),
            'last_page' => $data->lastPage(),
            'total' => $data->total(),
        ];
    }
}
