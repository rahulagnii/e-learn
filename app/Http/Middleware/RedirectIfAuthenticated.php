<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  ...$guards
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                if (Auth::user()->hasRole('admin')) {

                    return redirect('/admin');
                }
                if (Auth::user()->hasRole('driver')) {

                    return redirect('/driver');
                }
                if (Auth::user()->hasRole('hospital')) {

                    return redirect('/hospital');
                }
                if (Auth::user()->hasRole('client')) {

                    return redirect('/client');
                }
            }
        }

        return $next($request);
    }
}
