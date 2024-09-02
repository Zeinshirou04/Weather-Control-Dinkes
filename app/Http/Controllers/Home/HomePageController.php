<?php

namespace App\Http\Controllers\Home;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Devices\Device;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class HomePageController extends Controller
{
    public function index()
    {

        $contents = array();

        try {
            $response = Http::get('https://semarangkota.go.id/packages/rss/');
            $contents = json_decode($response->getBody());
        } catch (RequestException $e) {
            // Handle error response
            $contents = array_fill(0, 10, [
                'id' => 'dummy_id',
                'titel' => 'Dummy Title',
                'url' => 'https://semarangkota.go.id/',
                'tgl_publish' => '2024-03-18',
                'fav' => 'https://semarangkota.go.id/packages/upload/photo/noimage.jpg'
            ]);
        }

        $data = [
            "news" => array_slice($contents, 0, 10)
        ];
        return Inertia::render('Home/WelcomePage', $data);
    }
}
