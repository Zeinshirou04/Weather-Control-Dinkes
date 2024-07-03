<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Device\RegisterDeviceController;
use App\Http\Controllers\Home\HomePageController;

Route::get('/', [HomePageController::class, 'index'])->name('welcome.index');
Route::post('devices/create', [RegisterDeviceController::class, 'create'])->name('device.create');

require __DIR__.'/auth.php';
