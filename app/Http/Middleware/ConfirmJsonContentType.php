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
        if(
            $request->validate([
                'wac' => 'required|uuid',
                'wind_dir' => 'required|integer|digits:3',
                'avg_wind_spd' => 'required|numeric|between:0,99.9',
                'max_wind_spd' => 'required|numeric|between:0,99.9',
                'rain_fall_ph' => 'required|numeric|between:0,99.9',
                'rain_fall_pd' => 'required|numeric|between:0,99.9',
                'temperature' => 'required|numeric|between:0,999.9',
                'humidity' => 'required|integer|digits:3',
                'barometric_pressure' => 'required|numeric|between:0,9999.99',
            ])
        ) return $next($request);
        return $next($request);
    }
}
