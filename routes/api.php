<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Device\WebsocketDeviceController;
use App\Http\Middleware\ConfirmJsonContentType;

Route::middleware([ConfirmJsonContentType::class])->group(function () {
    Route::apiResource('device', WebsocketDeviceController::class)->except([
        'index'
    ]);
});

