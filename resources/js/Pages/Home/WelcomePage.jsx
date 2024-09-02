import { Head } from "@inertiajs/react";
import { React, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import axios from "axios";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import Home from "@/Layouts/HomeLayout";

export default function Welcome({  }) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const [data, setData] = useState(null);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [map, setMap] = useState(null);
    const [news, setNews] = useState(Array(10));

    const fetchData = async () => {
        const response = await axios.get(
            // "http://localhost:8000/api/device/71f913f7-821b-3b2b-9494-79e2cd0a9856",
            "https://weather.robotlintang.id/api/device/71f913f7-821b-3b2b-9494-79e2cd0a9856"
        );
        setData(response.data.data);
        setLocation({
            latitude: response.data.lat,
            longitude: response.data.long,
        });
    };

    const fetchNews = async () => {
        try {
            const response = await axios.get(
                "https://semarangkota.go.id/packages/rss/", {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            );
            console.log(response);
        } catch (err) {
            setNews(
                Array.from(10, () => ({
                    id: "dummy_id",
                    titel: "Dummy Title",
                    url: "https://semarangkota.go.id/",
                    tgl_publish: "2024-03-18",
                    fav: "https://semarangkota.go.id/packages/upload/photo/noimage.jpg",
                }))
            );
        }
    };

    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    useEffect(() => {
        return fetchNews();
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("Fetching...");
            try {
                fetchData();
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }, 3000);

        if (!data)
            setData({
                wind_dir: 120,
                avg_wind_spd: 6,
                max_wind_spd: 12.5,
                rain_fall_ph: 0.1,
                rain_fall_pd: 0.2,
                temperature: 31,
                humidity: 25,
                barometric_pressure: 1002.23,
            });
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setMap(
            <Map
                className="w-full h-full border-2 border-[#A7D7C5]"
                center={{
                    lat: location.latitude,
                    lng: location.longitude,
                }}
                defaultZoom={18}
                gestureHandling={"greedy"}
                // disableDefaultUI={true}
            >
                <Marker
                    position={{
                        lat: location.latitude,
                        lng: location.longitude,
                    }}
                />
            </Map>
        );
    }, [location]);

    if (loading)
        return (
            <div className="w-svw h-svh flex flex-col justify-center items-center">
                <img
                    className="w-32"
                    src="assets/img/logoDinkes.png"
                    alt="Logo Kementrian Kesehatan"
                />
                <div className="mt-8">
                    <p className="text-lg">Mohon tunggu...</p>
                </div>
            </div>
        );
    if (error)
        return (
            <div className="w-svw h-svh text-center flex flex-col justify-center">
                <p>Error: {error.message}</p>
            </div>
        );

    // console.log(data);

    let newsBody = [];

    news.forEach((el) => {
        newsBody.push(
            <section className="w-full grid grid-flow-col px-6 py-2 gap-3">
                <figure className="w-24 h-24">
                    <img
                        className="w-full h-full bg-cover"
                        src={el.fav}
                        alt="News Image"
                        onError={(e) =>
                            (e.target.src =
                                "https://img.freepik.com/premium-vector/image-available-icon_268104-3618.jpg")
                        }
                    />
                </figure>
                <article className="w-full col-span-4">
                    <header>
                        <a
                            target="_blank"
                            href={`https://semarangkota.go.id/p/${el.id}/${el.url}`}
                        >
                            <h6 className="text-md font-bold hover:underline">
                                {el.titel}
                            </h6>
                        </a>
                    </header>
                    <p className="text-sm">{el.tgl_publish}</p>
                </article>
            </section>
        );
    });

    const carouselItems = [
        <div className="carousel-item active float-left w-full h-full">
            <img
                src="assets/img/smg1.jpg"
                className="h-full w-full object-cover translate-y-12"
                alt="Pemandangan Kota Semarang"
            />
        </div>,
        <div className="carousel-item active float-left w-full h-full">
            <img
                src="assets/img/smg2.jpg"
                className="h-full w-full object-cover"
                alt="Pemandangan Kota Semarang"
            />
        </div>,
    ];

    return (
        <Home>
            <Head title="Pantau Cuaca Kotamu!" />

            <div className="w-full h-52">
                <Carousel
                    className="h-full rounded-lg"
                    responsive={responsive}
                    autoPlay={true}
                    infinite={true}
                    autoPlaySpeed={3000}
                    transitionDuration={150}
                    removeArrowOnDeviceType={["desktop"]}
                >
                    {carouselItems}
                </Carousel>
            </div>

            <section className="w-full flex flex-col gap-8 h-full mt-12">
                <div className="w-full flex flex-row gap-2 h-full">
                    <article className="w-3/5 flex flex-col gap-8">
                        <div className="w-full h-40 bg-[#A7D7C5]/40 shadow-md rounded-lg flex flex-col py-2">
                            <div className="h-12 w-full border-b-gray-400 border-b-2 px-6">
                                <h5 className="font-semibold text-gray-900 text-lg">
                                    Cuaca dini hari di Bangunharjo, Semarang
                                    Tengah
                                </h5>
                            </div>
                            <div className="h-full w-full flex flex-col gap-2 px-6 py-2">
                                <div className="w-full flex flex-row items-center gap-2">
                                    <div className="w-14">
                                        <i class="fa-solid fa-compass text-5xl text-gray-500"></i>
                                    </div>
                                    <p className="text-lg">
                                        Derajat Arah Angin{" "}
                                        <strong>
                                            {data.wind_dir / 1}
                                            <span>&deg;</span>
                                        </strong>
                                    </p>
                                </div>
                                <div className="w-full flex flex-row items-center gap-2">
                                    <div className="w-14">
                                        <i class="fa-solid fa-wind text-5xl text-gray-500"></i>
                                    </div>
                                    <p className="text-lg">
                                        Kecepatan angin rata-rata berada pada{" "}
                                        <strong>
                                            {data.avg_wind_spd}
                                            <span>m/s</span>
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row gap-8">
                            <div className="w-full bg-[#A7D7C5]/40 shadow-md rounded-lg flex flex-col gap-4">
                                <header className="border-b-gray-400 border-2 px-6 py-1">
                                    <h4 className="text-lg font-bold">
                                        Prediksi Cuaca
                                    </h4>
                                </header>
                                <div className="w-full grid grid-rows-2 px-6 pb-2 gap-4">
                                    <div className="flex flex-row gap-4 items-center">
                                        <div className="w-14">
                                            <i class="fa-solid fa-cloud text-5xl text-gray-500"></i>
                                        </div>
                                        <p className="text-md">
                                            Cuaca saat ini:{" "}
                                            <strong>Cerah Berawan</strong>
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-4 items-center">
                                        <div className="w-14">
                                            <i class="fa-solid fa-cloud-rain text-6xl text-gray-500"></i>
                                        </div>
                                        <p className="text-md">
                                            Curah hujan:{" "}
                                            <strong>
                                                {data.rain_fall_ph}
                                                <span>mm</span>
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-[#A7D7C5]/40 shadow-md rounded-lg flex flex-col gap-4">
                                <header className="border-b-gray-400 border-2 px-6 py-1">
                                    <h4 className="text-lg font-bold">
                                        Data Lain
                                    </h4>
                                </header>
                                <div className="w-full flex flex-col px-6 pb-2 gap-2">
                                    <p className="text-md">
                                        Suhu:{" "}
                                        <strong>
                                            {data.temperature / 1}&deg;C
                                        </strong>
                                    </p>
                                    <p className="text-md">
                                        Kelembapan:{" "}
                                        <strong>{data.humidity}RH</strong>
                                    </p>
                                    <p className="text-md">
                                        Kecepatan Angin (Maximal):{" "}
                                        <strong>{data.max_wind_spd}m/s</strong>
                                    </p>
                                    <p className="text-md">
                                        Curah Hujan (Perjam):{" "}
                                        <strong>{data.rain_fall_ph}mm</strong>
                                    </p>
                                    <p className="text-md">
                                        Curah Hujan (Perhari):{" "}
                                        <strong>{data.rain_fall_pd}mm</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                    <aside className="w-2/5 h-auto">
                        <div className="w-full h-full bg-[#A7D7C5]/40 shadow-md rounded-lg px-2 py-2">
                            <APIProvider apiKey={googleApiKey}>
                                {map}
                            </APIProvider>
                        </div>
                    </aside>
                </div>
                <div className="w-full flex flex-row gap-2">
                    <section className="w-full">
                        <header>
                            <h4 className="text-xl font-bold">
                                Spesifikasi Alat
                            </h4>
                        </header>
                        <article className="flex flex-row gap-8">
                            <div className="max-w-xl">
                                <p className="text-md max-w-xl">
                                    Sensor Suhu: Bilangan Bulat Derajat Celcius
                                    (&deg;C)
                                </p>
                                <p className="text-md max-w-xl">
                                    Sensor Kelembapan: Bilangan Asli Persen (%)
                                </p>
                                <p className="text-md max-w-xl">
                                    Sensor Tekanan Udara: Bilangan Asli Atmosfer
                                    (atm)
                                </p>
                            </div>
                            <div className="max-w-xl">
                                <p className="text-md max-w-xl">
                                    Sensor Arah Angin: Bilangan Asli Derajat
                                    (&deg;)
                                </p>
                                <p className="text-md max-w-xl">
                                    Sensor Kecepatan Angin: Bilangan Asli Meter
                                    per Sekon (m/s)
                                </p>
                            </div>
                        </article>
                    </section>
                </div>
                <div className="w-full flex flex-row gap-2">
                    <div className="w-full h-full bg-[#A7D7C5]/40 shadow-md rounded-lg">
                        <header className="border-b-gray-400 border-2 px-6 py-1">
                            <h4 className="text-lg font-bold">
                                Berita Terkini
                            </h4>
                        </header>
                        <div className="w-full grid grid-cols-2">
                            {newsBody}
                        </div>
                    </div>
                </div>
            </section>
        </Home>
    );
}
