<?php


namespace Oza75\LaravelHubble\Concerns;


use Oza75\LaravelHubble\Field;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

trait HandlesFilters
{
    /**
     * @param Builder $query
     * @param Request $request
     */
    protected function applyFilters(Builder $query, Request $request)
    {
        $filters = $this->filters() ?? [];

        foreach ($filters as $filter) {
            $value = $request->get($filter->getColumn(), null);
            if (is_null($value)) continue;

            $filter->handle($query, $value);
        }
    }

    /**
     * @param Builder $query
     * @param Request $request
     * @return void|null
     */
    protected function applySorts(Builder $query, Request $request)
    {
        $fields = $this->getVisibleFields('index');

        $sort = $request->get('sort', []);

        if (!isset($sort['by'])) {
            $this->applyDefaultSort($query, $fields);
            return;
        }

        $field = collect($fields)->first(function (Field $field) use ($sort) {
            return $field->getName() === $sort['by'] && $field->isSortable();
        });

        if (!$field) return;

        $query->orderBy($field->getName(), $this->sortType($sort));
    }

    /**
     * @param $sort
     * @return string
     */
    private function sortType($sort): string
    {
        $type = $sort['type'] ?? 'asc';

        return in_array($type, ['asc', 'desc']) ? $sort['type'] : 'asc';
    }

    /**
     * @param Builder $query
     * @param $fields
     * @return void
     */
    protected function applyDefaultSort(Builder $query, $fields): void
    {
        $field = collect($fields)->first(function (Field $field) {
            return $field->isUsedAsDefaultSort();
        });

        if (is_null($field)) return;

        $query->orderBy($field->getName(), $field->getDefaultSortType());

        return;
    }

    /**
     * @param Builder $query
     * @param Request $request
     */
    protected function applySearch(Builder $query, Request $request)
    {
        $value = $request->get('search', null);
        if (!$this->searchable() || !$value) return;

        $query->where(function ($query) use ($value) {
            foreach ($this->searchColumns as $column) {
                $query->orWhereRaw('lower(' . $column . ') like ?', ['%' . Str::lower($value) . '%']);
            }
        });
    }
}
