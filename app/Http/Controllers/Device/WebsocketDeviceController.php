<?php

namespace App\Http\Controllers\Device;

use App\Http\Controllers\Controller;
use App\Http\Requests\Device\EnvironmentRequest;
use App\Models\Devices\Device;
use App\Models\Devices\Measure;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WebsocketDeviceController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(EnvironmentRequest $request)
    {
        if (!Device::find($request->wac)) return response()->json([
            'message' => 'Device is not registered, please ask the Admin to register a new device'
        ], 400);
        // return response()->json($request->except('wac'));
        $measure = Measure::create(
            $request->merge(['wac_id' => $request->wac])->except('wac')
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
                'lat' => Device::where('id', $id)
                    ->first()
                    ->toArray()['latitude'],
                'long' => Device::where('id', $id)
                    ->first()
                    ->toArray()['longitude'],
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
