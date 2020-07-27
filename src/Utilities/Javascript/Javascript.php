<?php


namespace Oza75\LaravelHubble\Utilities\Javascript;

class Javascript
{
    /**
     * @var Javascript
     */
    private static $instance;

    /**
     * Contient toutes les données qui doivent être convertit en javascript
     *
     * @var array
     */
    private $data = [];

    /**
     * @return Javascript
     */
    public static function getInstance(): self
    {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Ajoute des données dans le tableau
     *
     * @param array $data
     * @return $this
     */
    public function put(array $data): self
    {
        $this->data = array_merge_recursive($this->data, $data);

        return $this;
    }

    /**
     * @param string $key
     * @param $value
     * @return $this
     */
    public function putItem(string $key, $value): self
    {
        $this->data[$key] = $value;

        return $this;
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return $this->data;
    }

    /**
     * @return string
     */
    public function toJson(): string
    {
        return json_encode($this->toArray());
    }

    /**
     * @return string
     */
    public function toScripts(): string
    {
        $data = $this->toArray();
        $content = '';

        foreach ($data as $key => $datum) {
            $content .= "window.{$key}=" . json_encode($datum) . ";";
        }

        $content.='const $_jp_php_vars_gv=function(e,l){if(!l||!e)return null;let t=String(e).replace(/[\[\]]/gm,".").replace("..",".").split(".");t=t.filter(e=>""!==e);let r=!1,n=l;for(let e=0;e<t.length;e++){let l=n[t[e]];if(!l){r=!0;break}n=l}return r?null:n};';
        $content.='window.old=function(n,o){return $_jp_php_vars_gv(n,window._old)||o};';
        $content.='window.trans=function(r,n={},t=""){let e=String($_jp_php_vars_gv(r,window._trans)||t);return Object.keys(n).forEach(r=>{e=e.replace(`:${r}`,n[r])}),e};';
        $content.='window.hasFormError=function(r){return!!$_jp_php_vars_gv(r,window._errors)};';
        $content.='window.getFormErrors=function(r){return $_jp_php_vars_gv(r,window._errors)||[]};';

        return "<script type='text/javascript'>{$content}</script>";
    }

}
