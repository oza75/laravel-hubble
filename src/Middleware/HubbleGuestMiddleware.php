<?php


namespace Oza75\LaravelHubble\Middleware;


use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HubbleGuestMiddleware
{

    public function handle(Request $request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            return redirect()->route('hubble.login');
        }

        return $next($request);
    }
}
