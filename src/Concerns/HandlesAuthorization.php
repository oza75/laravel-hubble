<?php


namespace Oza75\LaravelHubble\Concerns;


use Exception;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;

trait HandlesAuthorization
{
    protected $authorizationMethods = [
        'index' => 'viewAny',
        'show' => 'view',
        'edit' => 'update',
        'update' => 'update',
        'delete' => 'delete',
        'create' => 'create',
        'attach' => 'attach',
        'detach' => 'detach'
    ];

    /**
     * @param $section
     * @param $model
     * @return bool
     * @throws Exception
     */
    protected function canAccess($section, $model)
    {
        $ability = $this->authorizationMethods[$section] ?? null;

        if (app()->environment('local') && is_null($ability)) {
            throw new Exception("There is no authorization handler for $section section !");
        }

        if (is_null(Gate::getPolicyFor($model)) || is_null($ability)) return true;

        return Gate::allows($ability, $model);
    }

    /**
     * @param $section
     * @param $model
     * @return bool|Response
     * @throws Exception
     */
    protected function authorizes($section, $model)
    {
        $ability = $this->authorizationMethods[$section] ?? null;

        if (app()->environment('local') && is_null($ability)) {
            throw new Exception("There is no authorization handler for $section section !");
        }

        if (is_null(Gate::getPolicyFor($model)) || is_null($ability)) return true;

        return Gate::authorize($ability, $model);
    }
}
