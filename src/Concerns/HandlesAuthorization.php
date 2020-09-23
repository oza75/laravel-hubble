<?php


namespace Oza75\LaravelHubble\Concerns;


use Exception;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

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
        $ability = $this->getAbility($section);

        $policy = Gate::getPolicyFor($model);

        if (is_null($policy) || is_null($ability)) return true;

        if (!method_exists($policy, $ability)) return true;

        return Gate::allows($ability, $model);
    }

    protected function canAttach($model, $related)
    {
        $policy = Gate::getPolicyFor($model);

        $ability = Str::ucfirst(Str::lower(Str::singular(class_basename($related))));

        if (is_null($policy) || is_null($ability)) return true;

        return $this->callPolicyMethod($policy, 'attach' . $ability);
    }

    protected function canDetach($model, $item)
    {
        $policy = Gate::getPolicyFor($model);

        $ability = Str::ucfirst(Str::lower(Str::singular(class_basename(get_class($item)))));

        if (is_null($policy)) return true;

        return $this->callPolicyMethod($policy, 'detach' . $ability, [$item]);
    }

    /**
     * @param object $policy
     * @param string $ability
     * @param array $arguments
     * @return bool|mixed
     */
    protected function callPolicyMethod(object $policy, $ability, $arguments = [])
    {
        $user = call_user_func(app('auth')->userResolver());

        $result = $this->callPolicyBefore($policy, $user, $ability);

        if (! is_null($result)) {
            return $result;
        }

        if (!method_exists($policy, $ability)) return true;

        return call_user_func([$policy, $ability], $user, ...$arguments);
    }

    /**
     * @param object $policy
     * @param $user
     * @param $ability
     * @return mixed|void
     */
    protected function callPolicyBefore(object $policy, $user, $ability)
    {
        if (!method_exists($policy, 'before')) {
            return;
        }

        return call_user_func([$policy, 'before'], $user, $ability);
    }

    /**
     * @param $section
     * @param $model
     * @return bool|Response
     * @throws Exception
     */
    protected function authorizes($section, $model)
    {
        $ability = $this->getAbility($section);

        $policy = Gate::getPolicyFor($model);

        if (is_null($policy) || is_null($ability)) return true;

        if (!method_exists($policy, $ability)) return true;

        return Gate::authorize($ability, $model);
    }

    /**
     * @param $section
     * @return string|null
     * @throws Exception
     */
    protected function getAbility($section)
    {
        $ability = $this->authorizationMethods[$section] ?? null;

        if (app()->environment('local') && is_null($ability)) {
            throw new Exception("There is no authorization handler for $section section !");
        }

        return $ability;
    }
}
