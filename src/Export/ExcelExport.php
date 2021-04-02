<?php


namespace Oza75\LaravelHubble\Export;


use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use LogicException;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Oza75\LaravelHubble\Field;
use Oza75\LaravelHubble\Fields\BooleanField;
use Oza75\LaravelHubble\Fields\FileField;
use Oza75\LaravelHubble\HubbleResource;

class ExcelExport implements ResourceExporter, FromCollection, WithHeadings, WithColumnFormatting
{
    use Exportable;

    /**
     * @var HubbleResource
     */
    private $resource;
    /**
     * @var Collection
     */
    private $data;

    public function boot(HubbleResource $resource): ResourceExporter
    {
        $this->resource = $resource;

        $this->data = $this->extractData();

        return $this;
    }

    /**
     * @return Collection
     */
    public function collection(): Collection
    {
        return $this->data;
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        $first = $this->data->first();

        abort_if(is_null($first), 404);

        return collect($first)->keys()->toArray();
    }

    /**
     * @return array
     */
    public function columnFormats(): array
    {
        return [];
    }

    private function extractData(): Collection
    {
        $cursor = $this->resource->indexQuery()->cursor();

        $collection = collect();

        $cursor->each(function ($item) use (&$collection) {
            $row = $this->resource->fieldCollection->visible('export')
                ->filter(function (Field $field) {
                    return !($field instanceof FileField);
                })
                ->mapWithKeys(function (Field $field) use ($item) {
                    $value = $this->fieldValue($field, $item);
                    if ($field instanceof BooleanField) {
                        $value = $value ? 'Oui' : 'Non';
                    }
                    return [$field->getTitle() => $value];
                });

            $row = $row->map(function ($item) {
                return $item ?? 'N/A';
            })->toArray();

            $collection->add($row);
        });

        return $collection;
    }

    /**
     * @param Field $field
     * @return mixed
     */
    private function value(Field $field, $item)
    {
        try {
            return $item->getAttribute($field->getName());
        } catch (LogicException $exception) {
            if (Str::contains($exception->getMessage(), 'must return a relationship instance')) {
                return null;
            }
            throw $exception;
        }
    }

    private function fieldValue(Field $field, $item): string
    {
        $value = $field->resolveData($this->value($field, $item), $item, 'export');

        return strip_tags($value);
    }
}
