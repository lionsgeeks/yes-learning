<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class steps
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if ($user && empty($user->language)) {
            if ($request->path() !== 'steps') {
                return redirect('/steps');
            }
        }

        return $next($request);
    }
}
