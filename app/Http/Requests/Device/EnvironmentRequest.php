<?php

namespace App\Http\Requests\Device;

use Illuminate\Foundation\Http\FormRequest;

class EnvironmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'wac' => 'required|uuid',
            'wind_dir' => 'required|integer|min:0|digits_between:0,3',
            'avg_wind_spd' => 'required|numeric|between:0,999.99',
            'max_wind_spd' => 'required|numeric|between:0,999.99',
            'rain_fall_ph' => 'required|numeric|between:0,999.99',
            'rain_fall_pd' => 'required|numeric|between:0,999.99',
            'temperature' => 'required|numeric|between:0,999.99',
            'humidity' => 'required|integer|min:0|digits_between:0,3',
            'barometric_pressure' => 'required|numeric|between:0,9999.99',
        ];
    }
}
