<?php

namespace App\Http\Middleware;

use App\Traits\RespondsStatusTrait;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserActiveMiddleware
{
    use RespondsStatusTrait;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->active) {
            return $next($request);
        }else{
            return $this->response_error(__('message.user.inactive'));
        }
    }
}
