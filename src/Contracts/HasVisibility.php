<?php

namespace Oza75\LaravelHubble\Contracts;


interface HasVisibility
{
    /**
     * @param callable|null $when
     * @return $this
     */
    public function hide(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hideOnForms(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hideOnIndex(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hideWhenEditing(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function showOnIndex(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function showOnForms(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function hideOnDetails(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnIndex(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnForms(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyOnDetails(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyWhenEditing(?callable $when = null);

    /**
     * @param callable|null $when
     * @return $this
     */
    public function onlyWhenCreating(?callable $when = null);

    /**
     * @param string $section
     * @return bool
     */
    public function isVisibleOn(string $section);
}
