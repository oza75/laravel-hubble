<?php


namespace Oza75\LaravelHubble\Fields;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordField extends TextField
{
    public function __construct(string $name, string $title, bool $sortable = false)
    {
        parent::__construct($name, $title, $sortable);
        $this->onlyOnForms();
        $this->type('password');
    }

    public function retrieveFormData(Request $request, string $section)
    {
        return Hash::make($request->get($this->getName()));
    }

    public function resolveData($value, $resource, string $type)
    {
        $value = '';
        return parent::resolveData($value, $resource, $type);
    }
}
