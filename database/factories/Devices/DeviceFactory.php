<?php

namespace Database\Factories\Devices;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Devices\Device>
 */
class DeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => fake()->uuid(),
            'loc_kec' => env('DEFAULT_KODE_KEC'),
            'loc_kel' => env('DEFAULT_KODE_KEL'),
            'latitude' => -6.983931998561065,
            'longitude' => 110.41895582604218,
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
