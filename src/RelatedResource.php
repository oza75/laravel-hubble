<?php


namespace Oza75\LaravelHubble;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Oza75\LaravelHubble\Actions\DetachAction;
use Oza75\LaravelHubble\TableButtons\ExportButton;

class RelatedResource extends HubbleResource
{
    /**
     * @var HubbleResource
     */
    protected $related;

    protected $relationship;
    /**
     * @var Field
     */
    protected $field;
    /**
     * @var Resource|Resource
     */
    protected $parent;
    /**
     * @var Model
     */
    protected $parentModel;

    /**
     * RelatedResource constructor.
     * @param HubbleResource $related
     * @param HubbleResource $parent
     * @param Model $parentModel
     * @param Field $field
     * @param $relationship
     */
    public function __construct(HubbleResource $related, HubbleResource $parent, Model $parentModel, Field $field, $relationship)
    {
        $this->related = $related;
        $this->relationship = $relationship;

        $this->name = $related->getName();
        $this->title = $field->getTitle();
        $this->searchColumns = $related->getSearchColumns();
        $this->key = $related->getKey();
        $this->displayColumn = $related->getDisplayColumn();
        $this->field = $field;
        $this->parent = $parent;
        $this->parentModel = $parentModel;
        $this->setPerPage($field->getPerPage() ?? 15);
    }

    /**
     * @return Field[] array of fields
     */
    public function fields(): array
    {
        return $this->related->fields();
    }

    /**
     * @return Action[] array of actions
     */
    public function actions()
    {
        return array_merge($this->related->actions(), [DetachAction::make()]);
    }

    /**
     * @return Filter[] array of filters
     */
    public function filters()
    {
        return $this->related->filters();
    }

    public function tableButtons()
    {
        $url = route('api.hubble.related.attach', [
            'name' => $this->parent->getName(),
            'key' => \request('key'),
            'field' => $this->field->getName()
        ]);

        $exportUrl = route('api.hubble.related.export', [
            'name' => $this->parent->getName(),
            'key' => \request('key'),
            'field' => $this->field->getName()
        ]);

        return [
            TableModal::make(trans('laravel-hubble::dashboard.attach'), $url)
                ->setClasses('btn-secondary')
                ->setFields([
                    (clone $this->field)->addProp('multiple', true)->addProp('returnObject', false),
                ])
                ->displayWhen(function (User $user) {
                    $model = $this->related->getModel();
                    return $this->canAttach($this->parentModel, get_class($model));
                })
                ->confirmText(trans('laravel-hubble::dashboard.attach')),

            ExportButton::make('', 'Exporter', $exportUrl, 'btn-primary')
                ->displayWhen(function (User $user) {
                    return $this->field->isExportable();
                }),
        ];
    }

    /**
     * @return Builder
     */
    public function baseQuery(): Builder
    {
        $relatedQuery = $this->related->baseQuery();
        $with = $relatedQuery->getEagerLoads();

        $relationshipQuery = (clone $this->relationship)->newQuery();
        $relationshipQuery->setEagerLoads($with);
        $query = $relationshipQuery->getQuery();

        $columns = $relatedQuery->getQuery()->columns;

        if (!empty($columns)) {
            $columnSql = $relatedQuery->getQuery()->getGrammar()->columnize($columns);
            $query->selectRaw($columnSql);
        }

        $builder = $query->getQuery();
        $wheres = $builder->wheres;
        $bindings = $builder->bindings;
        $builder->wheres = [];
        $builder->bindings = [];

        $builder->wheres = array_merge($relatedQuery->getQuery()->wheres, $wheres);

        foreach (array_keys($relatedQuery->getQuery()->bindings) as $key) {
            $builder->bindings[$key] = array_values(
                array_merge($relatedQuery->getQuery()->bindings[$key], (array)$bindings[$key])
            );
        }

        return $relationshipQuery->getQuery();
    }

    protected function urls()
    {
        $urls = parent::urls();

        $urls['api']['index'] = route('api.hubble.related.index', [
            'name' => $this->parent->getName(),
            'key' => $this->parentModel->{$this->parentModel->getKeyName()},
            'field' => $this->field->getName()
        ]);

        return $urls;
    }

    /**
     * @param string $section
     * @return array
     */
    public function toArray(string $section = 'index')
    {
        $data = parent::toArray($section);
        $data['isManyRelation'] = true;

        $field = $this->field->toArray('creating');
        $data['field'] = collect($field)->first();

        return $data;
    }

    /**
     * @param $resource
     * @return array
     */
    public function resolveItemUrls($resource)
    {
        $data = $this->related->resolveItemUrls($resource);

        if ($this->canDetach($this->parentModel, $resource)) {
            $data['delete'] = route('api.hubble.related.detach', [
                'name' => $this->parent->getName(),
                'key' => $this->parentModel->{$this->parentModel->getKeyName()},
                'field' => $this->field->getName(),
                'id' => $resource->{$this->related->getKey()},
            ]);
        } else {
            unset($data['delete']);
        }

        return $data;
    }

    /**
     * @param $id
     * @param Request $request
     * @return mixed|bool
     */
    public function detach($id, Request $request)
    {
        $model = $this->relationship->getRelated();
        $item = $model->where($model->getKeyName(), $id)->firstOrFail();

        if ($this->relationship instanceof HasMany
            || $this->relationship instanceof MorphMany
            || $this->relationship instanceof MorphOne
        ) {
            return $item->update([$this->relationship->getForeignKeyName() => null]);
        } elseif ($this->relationship instanceof BelongsToMany) {
            return $this->relationship->detach($item);
        }

        return false;
    }

    /**
     * @param Request $request
     * @return bool
     */
    public function attach(Request $request)
    {
        $request->validate([$this->field->getName() => 'required']);
        $ids = Arr::wrap($request->get($this->getName()));
        $model = $this->relationship->getRelated();
        $items = $model->whereIn($model->getKeyName(), $ids)->get();

        if ($this->relationship instanceof HasMany) {
            $this->relationship->saveMany($items);
        } elseif ($this->relationship instanceof BelongsToMany) {
            $this->relationship->attach($items);
        } elseif ($this->relationship instanceof MorphMany) {
            $this->relationship->saveMany($items);
        } elseif ($this->relationship instanceof MorphOne) {
            $this->relationship->saveMany($items);
        }

        return true;
    }

    /**
     * @return Field
     */
    public function getField()
    {
        return $this->field;
    }

    /**
     * @return HubbleResource|Resource
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * @return Model
     */
    public function getParentModel()
    {
        return $this->parentModel;
    }

    /**
     * @return mixed
     */
    public function getRelationship()
    {
        return $this->relationship;
    }
}
