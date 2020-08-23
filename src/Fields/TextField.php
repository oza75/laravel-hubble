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

}
