<?php


namespace Oza75\LaravelHubble;


use Illuminate\Support\Collection;
use Oza75\LaravelHubble\Contracts\HasVisibility;
use Oza75\LaravelHubble\Contracts\Relations\HandleManyRelationship;

class FieldCollection
{
    /**
     * @var Collection
     */
    protected $fields;

    /**
     * @var HubbleResource
     */
    protected $resource;

    /**
     * FieldCollection constructor.
     * @param HubbleResource $resource
     * @param array|null $fields
     */
    public function __construct(HubbleResource $resource, ?array $fields = [])
    {
        $this->resource = $resource;
        $this->fields = collect($fields);

        $this->bootAll();
    }

    public static function make(HubbleResource $resource, ?array $fields = []): FieldCollection
    {
        return new static($resource, $fields);
    }

    /**
     * @param Field $field
     * @return $this
     */
    public function add(Field $field): FieldCollection
    {
        $field->boot($this->resource);

        $this->fields->push($field);

        return $this;
    }

    public function build(string $section): array
    {
        return $this->visible($section)->mapWithKeys(function (Field $field) use ($section) {
            return $field->toArray($section);
        })->toArray();
    }

    /**
     * @param string $section
     * @return Collection
     */
    public function visible(string $section): Collection
    {
        return $this->fields->filter(function (HasVisibility $field) use ($section) {
            return $field->isVisibleOn($section) && !$field instanceof HandleManyRelationship;
        });
    }

    /**
     * @param $method
     * @param $args
     * @return mixed
     */
    public function __call($method, $args)
    {
        return $this->fields->{$method}(...$args);
    }

    protected function bootAll()
    {
        $this->fields->each(function (Field $field) {
            $field->boot($this->resource);
        });
    }

    /**
     * @param string $section
     * @return array
     */
    public function rules(string $section): array
    {
        return $this->visible($section)->mapWithKeys(function (Field $field) use ($section) {
            return [$field->getName() => $field->rulesFor($section)];
        })->filter(function ($rules) {
            return !empty($rules);
        })->toArray();
    }

    /**
     * @return Collection
     */
    public function getFields(): Collection
    {
        return $this->fields;
    }

    /**
     * @return array
     */
    public function all()
    {
        return $this->fields->all();
    }
}
