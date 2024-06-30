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
        if(!$request->isMethod('post')) return response()->json([
            'message' => 'Method is not accepted, please re-check your method!'
        ], 405);
        if(!$request->acceptsJson() || !$request->isJson()) return response()->json([
            'message' => 'Unsupported Media Type, please re-check your media type!'
        ], 415);
        if(!$request->has(['wac', 'so2', 'co2', 'no2', 'o3', 'pm25', 'pm10'])) return response()->json([
            'message' => 'Content mismatch, empty or not completed, please re-check your content!'
        ], 400);
        return $next($request);
    }
}
