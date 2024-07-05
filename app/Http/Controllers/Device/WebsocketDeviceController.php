<?php

namespace App\Http\Controllers\Device;

use App\Http\Controllers\Controller;
use App\Models\Devices\Device;
use App\Models\Devices\Measure;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WebsocketDeviceController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!Device::find($request->wac)) return response()->json([
            'message' => 'Device is not registered, please ask the Admin to register a new device'
        ], 400);
        // return response()->json($request->except('wac'));
        $measure = Measure::create(
            [
                'wac_id' => $request->wac,
                'wac_id' => $request->wac,
                'wind_dir' => $request->wind_dir,
                'avg_wind_spd' => $request->avg_wind_spd,
                'max_wind_spd' => $request->max_wind_spd,
                'rain_fall_ph' => $request->rain_fall_ph,
                'rain_fall_pd' => $request->rain_fall_pd,
                'temperature' => $request->temperature,
                'humidity' => $request->humidity,
                'barometric_pressure' => $request->barometric_pressure
            ]
        );
        try {
            $measure;
            return response()->json([
                'message' => 'Content saved successfully!',
                'saved_at' => Carbon::now()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'error' => $th['error']
                ],
                500
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $data = [
                'status' => 'berhasil!',
                'data' => Measure::where('wac_id', $id)
                    ->orderBy('created_at', 'desc')
                    ->first()
                    ->toArray()
            ];
        } catch (\Throwable $th) {
            $data = [
                'status' => 'data tidak ditemukan',
                'data' => 'null',
            ];
        }
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
