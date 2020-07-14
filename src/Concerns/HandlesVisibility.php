<?php


namespace Oza75\LaravelHubble\Concerns;

trait HandlesVisibility
{
    /**
     * @var bool[]
     */
    protected $visibility = [
        'index' => true,
        'editing' => true,
        'creating' => true,
        'details' => true,
    ];

    /**
     * @return $this
     */
    public function hide()
    {
        $this->visibility['index'] = false;
        $this->visibility['editing'] = false;
        $this->visibility['creating'] = false;
        $this->visibility['details'] = false;

        return $this;
    }

    /**
     * @return $this
     */
    public function hideOnForms()
    {
        $this->visibility['editing'] = false;
        $this->visibility['creating'] = false;

        return $this;
    }

    /**
     * @return $this
     */
    public function hideOnIndex()
    {
        $this->visibility['index'] = false;

        return $this;
    }

    /**
     * @return $this
     */
    public function hideWhenEditing()
    {
        $this->visibility['editing'] = false;

        return $this;
    }

    /**
     * @return $this
     */
    public function hideWhenCreating()
    {
        $this->visibility['creating'] = false;

        return $this;
    }

    /**
     * @return $this
     */
    public function hideOnDetails()
    {
        $this->visibility['details'] = false;

        return $this;
    }

    /**
     * @return $this
     */
    public function onlyOnIndex()
    {
        $this->visibility['details'] = false;
        $this->visibility['editing'] = false;
        $this->visibility['creating'] = false;
        $this->visibility['index'] = true;

        return $this;
    }

    /**
     * @return $this
     */
    public function onlyOnForms()
    {
        $this->visibility['details'] = false;
        $this->visibility['editing'] = true;
        $this->visibility['creating'] = true;
        $this->visibility['index'] = false;

        return $this;
    }

    /**
     * @return $this
     */
    public function onlyOnDetails()
    {
        $this->visibility['details'] = true;
        $this->visibility['editing'] = false;
        $this->visibility['creating'] = false;
        $this->visibility['index'] = false;

        return $this;
    }

    /**
     * @return $this
     */
    public function onlyOnEditing()
    {
        $this->visibility['details'] = false;
        $this->visibility['editing'] = true;
        $this->visibility['creating'] = false;
        $this->visibility['index'] = false;

        return $this;
    }

    /**
     * @return $this
     */
    public function onlyOnCreating()
    {
        $this->visibility['details'] = false;
        $this->visibility['editing'] = false;
        $this->visibility['creating'] = true;
        $this->visibility['index'] = false;

        return $this;
    }

    /**
     * @param string $section
     * @return bool
     */
    public function isVisibleOn(string $section)
    {
        return $this->visibility[$section] ?? true;
    }


}
