<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->char('loc_kec', 7);
            $table->char('loc_kel', 10);
            $table->double('latitude', 10, 8);
            $table->double('longitude', 11, 8);
            $table->timestamps();

            $table->index('id', 'wac_id');
        });

        Schema::create('device_measure', function (Blueprint $table) {
            $table->id('id');
            $table->decimal('so2', 2, 1);
            $table->decimal('co2', 2, 1);
            $table->decimal('no2', 2, 1);
            $table->decimal('o3', 2, 1);
            $table->decimal('pm25', 2, 1);
            $table->decimal('pm10', 2, 1);
            $table->timestamps();

            $table->foreignUuid('wac_id')->references('id')->on('devices');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('device');
    }
};
