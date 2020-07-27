<?php


namespace Oza75\LaravelHubble\Utilities\Javascript;

/**
 * Class JavascriptPut
 * @method static Javascript put(array $data)
 * @method static Javascript putItem(string $name, $value)
 * @method static array toArray()
 * @method static string toJson()
 * @method static string toScripts()
 *
 * @package App\Utilities\Javascript
 */
class JavascriptPut
{
    /**
     * Permet l'appel statique de toutes les method
     *
     * @param $name
     * @param $arguments
     * @return Javascript|mixed
     */
    public static function __callStatic($name, $arguments)
    {
        $instance = Javascript::getInstance();

        return call_user_func_array([$instance, $name], $arguments);
    }
}
