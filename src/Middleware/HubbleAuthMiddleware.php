<?php


namespace Oza75\LaravelHubble\Middleware;


use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class HubbleAuthMiddleware
{
    /**
     * @param Request $request
     * @param Closure $next
     * @param mixed ...$guards
     * @return mixed
     * @throws AuthenticationException
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        if (!Auth::check()) {
            $this->unauthenticated($guards, $request);
        }

        $response = Gate::inspect('viewHubble');

        if (!$response->allowed()) {
            Auth::logout();
            $this->unauthenticated($guards, $request);
        }

        return $next($request);
    }

    /**
     * @param Request $request
     * @return string
     */
    protected function redirectTo(Request $request)
    {
        return route('hubble.login');
    }

    /**
     * @param array $guards
     * @param Request $request
     * @throws AuthenticationException
     */
    public function unauthenticated(array $guards, Request $request): void
    {
        throw new AuthenticationException(
            'Unauthenticated.', $guards, $this->redirectTo($request)
        );
    }
}
