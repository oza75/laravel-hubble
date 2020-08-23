<?php


namespace Oza75\LaravelHubble\Contracts;


interface Arrayable
{
    /**
     * @param string $section
     * @return array
     */
    public function toArray(string $section): array;
}
