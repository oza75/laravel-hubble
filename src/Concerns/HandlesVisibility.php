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
    ];

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hide(?callable $when = null)
    {
        $this->setVisibility(['index', 'editing', 'creating', 'details'], $when ?? false, true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function only(?callable $when = null)
    {
        $this->setVisibility(['index', 'editing', 'creating', 'details'], $when ?? true);

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
        $this->setVisibility(['editing', 'creating', 'details'], false);
        $this->setVisibility('index', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnForms(?callable $when = null)
    {
        $this->setVisibility(['details', 'index'], false);
        $this->setVisibility(['creating', 'editing'], $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnDetails(?callable $when = null)
    {
        $this->setVisibility(['editing', 'creating', 'index'], false);
        $this->setVisibility('details', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnEditing(?callable $when = null)
    {
        $this->setVisibility(['details', 'creating', 'index'], false);
        $this->setVisibility('editing', $when ?? true);

        return $this;
    }

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnCreating(?callable $when = null)
    {
        $this->setVisibility(['details', 'editing', 'index'], false);
        $this->setVisibility('creating', $when ?? true);

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
        $visibility = $this->visibility[$section];

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
