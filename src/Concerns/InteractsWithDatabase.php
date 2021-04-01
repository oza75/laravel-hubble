<?php


namespace Oza75\LaravelHubble\Concerns;


use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Oza75\LaravelHubble\HubbleResource;

trait InteractsWithDatabase
{
    use HandlesFilters;

    /**
     * @param Request $request
     * @return LengthAwarePaginator
     */
    public function findItems(Request $request)
    {
        $query = $this->indexQuery();

        $this->applySearch($query, $request);
        $this->applyFilters($query, $request);
        $this->applySorts($query, $request);

        return $query->paginate($this->getPerPage());
    }

    /**
     * @param $id
     * @return mixed
     */
    public function findItem($id)
    {
        return $this->detailsQuery()->findOrFail($id);
    }

    /**
     * @param $item
     * @return mixed
     */
    public function delete($item)
    {
        $this->fireEvent('deleting', $item);

        $deleted = $item->delete();

        $this->fireEvent('deleted', $deleted);

        return $deleted;
    }

    /**
     * @param array $data
     * @param Request $request
     * @return mixed
     */
    public function create(array $data, Request $request)
    {
        $collection = collect($data)->filter(function ($value) {
            return $value !== HubbleResource::NULL_VALUE;
        });

        $rules = collect($this->fieldCollection->rules('creating'))->filter(function ($rule, $field) use ($collection) {
            return $collection->has($field);
        })->toArray();

        $request->validate($rules);

        $this->fireEvent('creating', $collection, $request);

        $created = $this->createQuery()->create($collection->toArray());

        $this->fireEvent('created', $created, $collection, $request);

        return $created;
    }

    /**
     * @param $item
     * @param array $data
     * @param Request $request
     * @return mixed
     */
    public function update($item, array $data, Request $request)
    {
        $collection = collect($data)->filter(function ($value) {
            return $value !== HubbleResource::NULL_VALUE;
        });

        $rules = collect($this->fieldCollection->rules('editing'))->filter(function ($rule, $field) use ($item, $collection) {
            return $collection->has($field) && ($item->{$field} !== $collection[$field] || empty($collection[$field]));
        })->toArray();

        $request->validate($rules);

        $this->fireEvent('updating', $item, $collection, $request);

        $item->update($collection->toArray());

        $this->fireEvent('updated', $item, $collection, $request);

        return $item;
    }

    protected function indexQuery()
    {
        return $this->baseQuery();
    }

    protected function editQuery()
    {
        return $this->baseQuery();
    }

    protected function createQuery()
    {
        return $this->baseQuery()->newQuery();
    }

    protected function detailsQuery()
    {
        return $this->baseQuery();
    }
}
