<?php

namespace Oza75\LaravelHubble\Configuration;

class ScreenConfiguration
{
    /**
     * @var string
     */
    protected $title;

    public function __construct()
    {
    }

    public static function make(): ScreenConfiguration
    {
        return new static();
    }

    /**
     * @return null|string
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return ScreenConfiguration
     */
    public function setTitle(string $title): ScreenConfiguration
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string[]
     */
    public function toArray(): array
    {
        return [
            'title' => $this->getTitle(),
        ];
    }
}
