<?php


namespace Oza75\LaravelHubble\Resources;


use Illuminate\Support\Facades\Gate;
use Oza75\LaravelHubble\Concerns\HandlesAuthorization;
use Oza75\LaravelHubble\Field;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use LogicException;

class DefaultResource extends JsonResource
{
    use HandlesAuthorization;

    private $presenter;
    /**
     * @var string
     */
    protected $section = 'index';

    /**
     * IndexResource constructor.
     * @param $resource
     * @param $presenter
     */
    public function __construct($resource, $presenter)
    {
        parent::__construct($resource);
        $this->presenter = $presenter;
    }

    public function toArray($request)
    {
        $data = collect($this->presenter->getVisibleFields($this->section))
            ->mapWithKeys(function (Field $field) {
                return [
                    $field->getName() => $field->resolveData($this->value($field), $this->resource, $this->section)
                ];
            })->toArray();

        $data[$this->presenter->getKey()] = $this->resource->{$this->presenter->getKey()};
        $data['@urls'] = $this->itemUrls();

        if (method_exists($this->presenter, 'additionalItemManagementOptions')) {
            $data['@urls']['more'] = $this->additionalItemManagementOptions();
        }

        return $data;
    }

    /**
     * @param Field $field
     * @return mixed
     */
    private function value(Field $field)
    {
        try {
            return $this->resource->{$field->getName()};
        } catch (LogicException $exception) {
            if (Str::contains($exception->getMessage(), 'must return a relationship instance')) {
                return null;
            }
            throw $exception;
        }
    }

    /**
     * @return Collection
     */
    protected function itemUrls()
    {
        $urls = $this->presenter->resolveItemUrls($this->resource);

        $urls = collect($urls)->map(function ($value) {
            if (is_array($value))
                return $value;

            return [
                'url' => $value,
                'target' => null
            ];
        })->filter(function ($value, $key) {
            return $this->canAccess($key, $this->resource);
        });

        return $urls;
    }

    /**
     * @return Collection
     */
    protected function additionalItemManagementOptions(): Collection
    {
        $urls = $this->presenter->additionalItemManagementOptions($this->resource);
        $urls = collect($urls)->map(function ($value) {
            if (is_array($value))
                return $value;

            return [
                'url' => $value
            ];
        });
        return $urls;
    }
}
