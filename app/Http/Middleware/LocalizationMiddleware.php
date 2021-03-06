<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LocalizationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user_language = Auth()->user()->language ?? 'ja';
        $lang = ($request->hasHeader('X-localization')) ? $request->header('X-localization') : $user_language;
        app()->setLocale($lang);
        return $next($request);
    }
}
