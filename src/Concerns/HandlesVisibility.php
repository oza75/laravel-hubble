<?php


namespace Oza75\LaravelHubble\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

trait HandlesVisibility
{
    /**
     * @var bool[]|callable[]|array[]
     */
    protected $visibility = [
        'index' => true,
        'editing' => true,
        'creating' => true,
        'details' => true,
        'export' => true,
    ];

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hide(?callable $when = null)
    {
        $this->setVisibility(['index', 'editing', 'creating', 'details', 'export'], $when ?? false, true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function only(?callable $when = null)
    {
        $this->setVisibility(['index', 'editing', 'creating', 'details', 'export'], $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hideOnForms(?callable $when = null)
    {
        $this->setVisibility(['editing', 'creating'], $when ?? false, true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hideOnIndex(?callable $when = null)
    {
        $this->setVisibility('index', $when ?? false, true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hideWhenEditing(?callable $when = null)
    {
        $this->setVisibility('editing', $when ?? false, true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hideWhenCreating(?callable $when = null)
    {
        $this->setVisibility('creating', $when ?? false, true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function showOnIndex(?callable $when = null)
    {
        $this->setVisibility('index', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function showOnForms(?callable $when = null)
    {
        $this->setVisibility(['editing', 'creating'], $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function showOnDetails(?callable $when = null)
    {
        $this->setVisibility('details', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function showWhenEditing(?callable $when = null)
    {
        $this->setVisibility('editing', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function showWhenCreating(?callable $when = null)
    {
        $this->setVisibility('creating', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hideOnDetails(?callable $when = null)
    {
        $this->setVisibility('details', $when ?? false, true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnIndex(?callable $when = null)
    {
        $this->setVisibility(['editing', 'creating', 'details', 'export'], false);
        $this->setVisibility('index', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnForms(?callable $when = null)
    {
        $this->setVisibility(['details', 'index', 'export'], false);
        $this->setVisibility(['creating', 'editing'], $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnDetails(?callable $when = null)
    {
        $this->setVisibility(['editing', 'creating', 'index', 'export'], false);
        $this->setVisibility('details', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyWhenEditing(?callable $when = null)
    {
        $this->setVisibility(['details', 'creating', 'index', 'export'], false);
        $this->setVisibility('editing', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyWhenCreating(?callable $when = null)
    {
        $this->setVisibility(['details', 'editing', 'index', 'export'], false);
        $this->setVisibility('creating', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnExport(?callable $when = null): HandlesVisibility
    {
        $this->setVisibility(['details', 'creating', 'editing', 'index'], false);
        $this->setVisibility('export', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hideOnExport(?callable $when = null): HandlesVisibility
    {
        $this->setVisibility('export', false);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function showOnExport(?callable $when = null): HandlesVisibility
    {
        $this->setVisibility('export', $when ?? true);

        return $this;
    }

    /**
     * @param array|string $sections
     * @param callable|boolean $visibility
     * @param bool $negation
     */
    protected function setVisibility($sections, $visibility, bool $negation = false)
    {
        foreach (Arr::wrap($sections) as $section) {
            $this->visibility[$section] = is_callable($visibility) ? [$visibility, $negation] : $visibility;
        }
    }

    /**
     * @param string $section
     * @return bool
     */
    public function isVisibleOn(string $section)
    {
        $visibility = $this->visibility[$section] ?? true;

        if (is_bool($visibility)) return $visibility;

        if (is_array($visibility)) {
            list($handler, $negation) = $visibility;
            $response = $handler(auth()->user(), $this->resource->getCurrentItem());
            return $negation ? !$response : $response;
        }

        if (is_callable($visibility)) {
            return $visibility(auth()->user(), $this->resource->getCurrentItem());
        }

        return true;
    }


}
