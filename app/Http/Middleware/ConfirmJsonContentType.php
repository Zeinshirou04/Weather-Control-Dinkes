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
        if($request->isMethod('get') && ($request->header('User-Agent') == "PostmanRuntime/7.39.0" || $request->header('User-Agent') == "axios")) return $next($request); 
        if(!$request->isMethod('post')) return response()->json([
            'message' => 'Method is not accepted, please re-check your method!'
        ], 405);
        if(!$request->acceptsJson() || !$request->isJson()) return response()->json([
            'message' => 'Unsupported Media Type, please re-check your media type!'
        ], 415);
        $cols = [
            'wac',
            'wind_dir',
            'avg_wind_spd',
            'max_wind_spd',
            'rain_fall_ph',
            'rain_fall_pd',
            'temperature',
            'humidity',
            'barometric_pressure'
        ];
        if(!$request->has($cols)) return response()->json([
            'message' => 'Content mismatch, empty or not completed, please re-check your content!',
            'error' => $request->has($cols)
        ], 400);
        $credentials = $request->validate([
            'wac' => 'required|uuid',
            'wind_dir' => 'required|integer|min:1|digits_between:1,3',
            'avg_wind_spd' => 'required|numeric|between:0,999.99',
            'max_wind_spd' => 'required|numeric|between:0,999.99',
            'rain_fall_ph' => 'required|numeric|between:0,999.99',
            'rain_fall_pd' => 'required|numeric|between:0,999.99',
            'temperature' => 'required|numeric|between:0,999.99',
            'humidity' => 'required|integer|min:1|digits_between:1,3',
            'barometric_pressure' => 'required|numeric|between:0,9999.99',
        ]);
        if($credentials) return $next($request);
    }
}
