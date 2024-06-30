<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Device>
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
            'loc_kec' => '3374130',
            'loc_kel' => '3374130005',
            'latitude' => -6.983931998561065,
            'longitude' => 110.41895582604218,
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
