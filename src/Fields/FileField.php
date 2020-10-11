<?php


namespace Oza75\LaravelHubble\Fields;


use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Oza75\LaravelHubble\Exceptions\FileUploadException;
use Oza75\LaravelHubble\Field;

class FileField extends Field
{
    protected $storageDisk = 'public';

    public function __construct(string $name, ?string $title = null)
    {
        parent::__construct($name, $title, false);
        $this->addProp('isFile', true);
        $this->registerFileResolver();
    }

    /**
     * @param string $storageDisk
     * @return FileField
     */
    public function setStorageDisk(string $storageDisk): FileField
    {
        $this->storageDisk = $storageDisk;
        return $this;
    }

    protected function registerComponents()
    {
        parent::registerComponents();

        $this->components = [
            'index' => 'index-file-field',
            'editing' => 'edit-file-field',
            'creating' => 'edit-file-field',
            'details' => 'show-file-field'
        ];
    }

    public function multiple()
    {
        $this->addProp('multiple', true);

        return $this;
    }

    public function max(int $max)
    {
        $this->addProp('max', $max);

        return $this;
    }

    /**
     * @param Request $request
     * @param string $section
     * @return mixed|void
     * @throws FileUploadException
     */
    public function retrieveFormData(Request $request, string $section)
    {
        $max = $this->getProp('max', $this->hasMultiple() ? INF : 1, $section) ?? 1;
        $files = $request->file($this->getName());
        $removed = $request->get($this->getName() . '__removed__', []);
        $old = $request->get($this->getName() . '__current__', []);
        $paths = collect($old)->filter(function ($item) use ($removed) {
            return !collect($removed)->contains($item);
        })->toArray();

        $this->resource->registerEvent($section === 'creating' ? 'created' : 'updated', function () use ($removed) {
            Storage::disk($this->storageDisk)->delete($removed);
        });

        $files = collect(Arr::wrap($files))->slice(0, $max - count($paths))->toArray();
        foreach ($files as $file) $paths[] = $this->store($file);

        return implode(",", $paths);
    }

    /**
     * @param UploadedFile $file
     * @return false|string
     * @throws FileUploadException
     */
    protected function store(UploadedFile $file)
    {
        $path = $file->store(Str::plural($this->getName()), $this->storageDisk);
        if (!$path) throw new FileUploadException("Cannot upload file into $this->storageDisk disk");
        return $path;
    }

    /**
     * @return mixed|null
     */
    public function hasMultiple()
    {
        return $this->getProp('multiple', false);
    }

    /**
     * @param string $accept
     * @return $this
     */
    public function accept(string $accept)
    {
        $this->addProp('accept', $accept);

        return $this;
    }

    protected function registerFileResolver(): void
    {
        $callable = function ($value) {
            if (is_null($value) || empty($value)) return [];
            $value = explode(",", $value);
            return collect($value)->map(function ($item) {
                return [
                    'url' => Str::startsWith($item, ['http://', 'https://']) ? $item : Storage::disk($this->storageDisk)->url($item),
                    'name' => $item
                ];
            })->toArray();
        };

        $this->displayUsing($callable);
    }
}
