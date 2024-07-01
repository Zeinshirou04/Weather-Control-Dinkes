<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Device\RegisterDeviceController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});
Route::post('devices/create', [RegisterDeviceController::class, 'create'])->name('device.create');

require __DIR__.'/auth.php';
