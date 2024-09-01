<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConfirmJsonContentType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($this->isGet($request)) return $next($request);
        if (!$this->isJsonType($request)) return response()->json([
            'message' => 'Unsupported Media Type, please re-check your media type!'
        ], 415);
        return $next($request);
    }

    public function isGet(Request $request)
    {
        if ($request->isMethod('get')) return true;
        return false;
    }

    public function isJsonType(Request $request)
    {
        if ($request->acceptsJson() || !$request->isJson()) return true;
        return false;
    }
}
