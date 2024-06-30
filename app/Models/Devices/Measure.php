<?php

namespace App\Models\Devices;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measure extends Model
{
    use HasFactory;

    protected $table = 'device_measure';

    protected $fillable = [
        'wac_id',
        'so2',
        'co2',
        'no2',
        'o3',
        'pm25',
        'pm10',
    ];

    protected $guarded = [];

    public function device() {
        return $this->belongsTo(Device::class);
    }
}
