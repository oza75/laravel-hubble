<?php


namespace Oza75\LaravelHubble\Fields;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Oza75\LaravelHubble\HubbleResource;

class PasswordField extends TextField
{
    public function __construct(string $name, ?string $title = null, bool $sortable = false)
    {
        parent::__construct($name, $title, $sortable);
        $this->onlyOnForms();
        $this->type('password');
    }

    public function retrieveFormData(Request $request, string $section)
    {
        $value = $request->get($this->getName());
        if (is_null($value)) return HubbleResource::NULL_VALUE;

        return Hash::make($request->get($this->getName()));
    }

    public function resolveData($value, $resource, string $type)
    {
        $value = '';
        return parent::resolveData($value, $resource, $type);
    }
}
