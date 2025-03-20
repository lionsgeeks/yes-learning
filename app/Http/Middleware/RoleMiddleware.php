<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // Ensure the user is authenticated
        if (!Auth::check()) {
            abort(403, 'Unauthorized');
        }

        // Get the authenticated user
        $user = Auth::user();

        if ($role === 'admin' && $user->role !== 'admin') {
            abort(403, 'Unauthorized: Admins only.');
        }

        if ($role === 'user' && $user->role === 'admin') {
            abort(403, 'Unauthorized: Users only.');
        }

        return $next($request);
    }
}
