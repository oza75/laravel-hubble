<?php


namespace Oza75\LaravelHubble\Concerns;


use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

trait InteractsWithDatabase
{
    use HandlesFilters;

    /**
     * @param Request $request
     * @return LengthAwarePaginator
     */
    public function findItems(Request $request)
    {
        $query = $this->baseQuery();

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
        return $this->baseQuery()->findOrFail($id);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        $this->fireEvent('deleting', $id);

        $item = $this->baseQuery()
            ->newQuery()
            ->where($this->key, $id)
            ->firstOrFail();

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
        $collection = collect($data);

        $this->fireEvent('creating', $collection, $request);

        $created = $this->baseQuery()->newQuery()->create($collection->toArray());

        $this->fireEvent('created', $created, $collection, $request);

        return $created;
    }

    /**
     * @param array $data
     * @param $id
     * @param Request $request
     * @return mixed
     */
    public function update($id, array $data, Request $request)
    {
        $collection = collect($data);

        $this->fireEvent('updating', $id, $collection, $request);

        $item = $this->baseQuery()->newQuery()->where($this->key, $id)->firstOrFail();

        $item->update($collection->toArray());

        $this->fireEvent('updated', $item, $collection, $request);

        return $item;
    }
}
