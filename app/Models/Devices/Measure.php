<?php

namespace App\Models\Devices;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measure extends Model
{
    use HasFactory;

    protected $table;

    public function __construct()
    {
        $this->table = env('MEASURE_TABLE_NAME');
    }

    protected $fillable = [
        'wac_id',
        'wind_dir',
        'avg_wind_spd',
        'max_wind_spd',
        'rain_fall_ph',
        'rain_fall_pd',
        'temperature',
        'humidity',
        'barometric_pressure'
    ];

    protected $guarded = [];

    public function device() {
        return $this->belongsTo(Device::class);
    }
}
