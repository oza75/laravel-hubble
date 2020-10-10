<?php


namespace Oza75\LaravelHubble\Fields;


use Oza75\LaravelHubble\Field;

class TextField extends Field
{
    /**
     * @param string $type
     * @return $this
     */
    public function type(string $type)
    {
        $this->addProp('type', $type);

        return $this;
    }

    /**
     * @param int $limit
     * @return $this
     */
    public function limit(int $limit)
    {
        $this->addProp('limit', $limit);

        return $this;
    }

    /**
     * @param string|callable|null $text
     * @param string|null $target
     * @return $this
     */
    public function link($text = null, $target = null)
    {
        $callable = function ($value, $resource) use ($text, $target) {
            $textValue = is_callable($text) ? call_user_func($text, $value, $resource) : (is_null($text) ? $value : $text);

            return "<a href='$value' target='$target'>$textValue</a>";
        };

        $this->displayOnIndexUsing($callable);
        $this->displayOnDetailsUsing($callable);

        return $this;
    }
}
