<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Devices\Device;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function index() {
        $data = [
            'latitude' => Device::where('id', '71f913f7-821b-3b2b-9494-79e2cd0a9856')
            ->first()
            ->toArray()['latitude'],
            'longitude' => Device::where('id', '71f913f7-821b-3b2b-9494-79e2cd0a9856')
            ->first()
            ->toArray()['longitude'],
        ];
        return Inertia::render('Home/WelcomePage', $data);
    }
}
