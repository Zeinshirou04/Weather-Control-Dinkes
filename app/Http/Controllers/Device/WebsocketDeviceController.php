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
        $measure = Measure::updateOrCreate(
            ['wac_id' => $request->wac],
            [
                'so2' => $request->so2,
                'co2' => $request->co2,
                'no2' => $request->no2,
                'o3' => $request->o3,
                'pm25' => $request->pm25,
                'pm10' => $request->pm10,
            ]
        );
        try {
            $measure;
            return response()->json([
                'message' => 'Data save success!'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th['error']
            ],
            500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
