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

        Schema::create('weather_data', function (Blueprint $table) {
            $table->id('id');
            $table->foreignUuid('wac_id')->references('id')->on('devices');
            $table->integer('wind_dir')->default(0);
            $table->decimal('avg_wind_spd', 3, 2)->default(0.0);
            $table->decimal('max_wind_spd', 3, 2)->default(0.0);
            $table->decimal('rain_fall_ph', 3, 2)->default(0.0);
            $table->decimal('rain_fall_pd', 3, 2)->default(0.0);
            $table->decimal('temperature', 4, 2)->default(0.0);
            $table->integer('humidity')->default(0);
            $table->decimal('barometic_pressure', 6, 2)->default(0.0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devices');
        Schema::dropIfExists('weather_data');
    }
};
