<?php


namespace Oza75\LaravelHubble\TableButtons;


use Oza75\LaravelHubble\TableButton;

class ExportButton extends TableButton
{
    public function __construct(string $resourceName, ?string $name = 'Exporter', ?string $url = null, ?string $classes = 'btn-coral')
    {
        parent::__construct($name, $url ?? route('api.hubble.export', ['name' => $resourceName]), $classes);

        $this->component = 'export-button';
    }
}
