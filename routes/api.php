<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Device\WebsocketDeviceController;
use App\Http\Middleware\ConfirmJsonContentType;

Route::apiResource('device', WebsocketDeviceController::class)->except([
    'index'
])->middleware(ConfirmJsonContentType::class);
