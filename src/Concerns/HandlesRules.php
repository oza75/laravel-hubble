<?php


namespace Oza75\LaravelHubble\Concerns;


use Illuminate\Support\Str;
use Illuminate\Validation\ValidationRuleParser;

trait HandlesRules
{
    protected $rules = [
        'creating' => [],
        'editing' => []
    ];

    /**
     * @param mixed ...$rules
     * @return $this
     */
    public function rules(...$rules)
    {
        $rules = $this->parseRules($rules);

        $this->addRule('creating', $rules);
        $this->addRule('editing', $rules);

        return $this;
    }

    /**
     * @param string $section
     * @param array $rules
     * @return $this
     */
    protected function addRule(string $section, array $rules)
    {
        $this->rules[$section] = array_merge($this->rules[$section], $rules);

        return $this;
    }

    /**
     * @param mixed ...$rules
     * @return $this
     */
    public function rulesWhenCreating(...$rules)
    {
        $this->addRule('creating', $this->parseRules($rules));

        return $this;
    }

    /**
     * @param mixed ...$rules
     * @return $this
     */
    public function rulesWhenUpdating(...$rules)
    {
        $this->addRule('editing', $this->parseRules($rules));

        return $this;
    }

    /**
     * @param string $section
     * @return array
     */
    public function rulesFor(string $section)
    {
        return $this->rules[$section] ?? [];
    }

    /**
     * @param string $section
     * @return array
     */
    public function parsedRules(string $section) {
        return collect($this->rulesFor($section))->mapWithKeys(function($rule) {
            $parsed = ValidationRuleParser::parse($rule);
            return [Str::lower($parsed[0]) => $parsed[1]];
        })->toArray();
    }
    /**
     * @param array $rules
     * @return array|false|string[]
     */
    private function parseRules(array $rules)
    {
        if (count($rules) === 1 && is_string($rules[0])) {
            $rules = explode('|', $rules[0]);
        }

        return $rules;
    }
}
