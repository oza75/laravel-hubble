<?php


namespace Oza75\LaravelHubble\Concerns;


use Oza75\LaravelHubble\Configuration\Configuration;
use Oza75\LaravelHubble\Configuration\ScreenConfiguration;

trait HandlesConfiguration
{

    /**
     * @param Configuration $configuration
     */
    public function configure(Configuration $configuration)
    {

    }

    protected function buildConfiguration(string $screen): array
    {
        $configuration = $this->defaultConfiguration();

        $this->configure($configuration);

        $screen = $configuration->getScreenConfiguration($screen);

        return $screen->toArray();
    }

    /**
     * @return Configuration
     */
    protected function defaultConfiguration(): Configuration
    {
        $configuration = Configuration::make($this);

        $configuration->index(function (ScreenConfiguration $configuration) {
            $configuration->setTitle($this->getTitle());
        });

        $configuration->details(function (ScreenConfiguration $configuration) {
            $configuration->setTitle(__('laravel-hubble::dashboard.details_title', ['name' => $this->getTitle()]));
        });

        $configuration->edit(function (ScreenConfiguration $configuration) {
            $configuration->setTitle(__('laravel-hubble::dashboard.edit_title', ['name' => $this->getTitle()]));
        });

        $configuration->create(function (ScreenConfiguration $configuration) {
            $configuration->setTitle(__('laravel-hubble::dashboard.create_title', ['name' => $this->getTitle()]));
        });

        return $configuration;
    }
}
