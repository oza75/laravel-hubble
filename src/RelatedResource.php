<?php


namespace Oza75\LaravelHubble;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Http\Request;

class RelatedResource extends HubbleResource
{
    /**
     * @var HubbleResource
     */
    private $related;

    private $relationship;
    /**
     * @var Field
     */
    private $field;
    /**
     * @var Resource|Resource
     */
    private $parent;
    /**
     * @var Model
     */
    private $parentModel;

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
    public function fields()
    {
        return $this->related->getLoadedFields();
    }

    /**
     * @return Action[] array of actions
     */
    public function actions()
    {
        return $this->related->actions();
    }

    /**
     * @return Filter[] array of filters
     */
    public function filters()
    {
        return $this->related->filters();
    }

    /**
     * @return Builder
     */
    public function baseQuery(): Builder
    {
        $relatedQuery = $this->related->baseQuery();
        $with = $relatedQuery->getEagerLoads();

        $newQuery = $this->relationship->newQuery();
        $newQuery->setEagerLoads($with);
        $query = $newQuery->getQuery();

        $columns = $relatedQuery->getQuery()->columns;

        if (!empty($columns)) {
            $columnSql = $relatedQuery->getQuery()->getGrammar()->columnize($columns);
            $query->selectRaw($columnSql);
        }

        $query->mergeWheres($relatedQuery->getQuery()->wheres, $relatedQuery->getQuery()->getBindings());

        return $newQuery->getQuery();
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
        $data['delete'] = route('api.hubble.related.detach', [
            'name' => $this->parent->getName(),
            'key' => $this->parentModel->{$this->parentModel->getKeyName()},
            'field' => $this->field->getName(),
            'id' => $resource->{$this->related->getKey()},
        ]);

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
        $request->validate(['id' => 'required']);

        $id = $request->get('id');
        $model = $this->relationship->getRelated();
        $item = $model->where($model->getKeyName(), $id)->firstOrFail();

        if ($this->relationship instanceof HasMany) {
            $this->relationship->save($item);
        } elseif ($this->relationship instanceof BelongsToMany) {
            $this->relationship->attach($item);
        } elseif ($this->relationship instanceof MorphMany) {
            $this->relationship->save($item);
        } elseif ($this->relationship instanceof MorphOne) {
            $this->relationship->save($item);
        }

        return true;
    }
}
