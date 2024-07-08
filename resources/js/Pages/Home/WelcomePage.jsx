import { Head } from "@inertiajs/react";
import { React, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import Home from "@/Layouts/HomeLayout";

export default function Welcome({ googleApiKey }) {
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

    // axios
    //     .get(
    //         "https://newsdata.io/api/1/latest?apikey=pub_4786655fa8d619a9dadf8d21dced948677e52&country=id&q=cuaca"
    //     )
    //     .then((response) => {
    //         console.log(response.data);
    //     });

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    // "http://localhost:8000/api/device/71f913f7-821b-3b2b-9494-79e2cd0a9856",
                    "https://weather.robotlintang.id/api/device/71f913f7-821b-3b2b-9494-79e2cd0a9856"
                );
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
    // if (error) return <div>Error: {error.message}</div>;

    // console.log(data);

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

            <article className="w-full flex flex-row gap-2 h-full mt-12">
                <section className="w-3/5 flex flex-col gap-8">
                    <div className="w-full h-40 bg-[#A7D7C5]/40 shadow-md rounded-lg flex flex-col py-2">
                        <div className="h-12 w-full border-b-gray-400 border-b-2 px-6">
                            <h5 className="font-semibold text-gray-900">
                                Cuaca dini hari di, Miroto
                            </h5>
                        </div>
                        <div className="h-full w-full flex flex-col gap-2 px-6 py-2">
                            <div className="w-full flex flex-row items-center gap-2">
                                <img
                                    className="w-12"
                                    src="assets/svg/cloud.svg"
                                    alt="Cloud Icon"
                                />
                                <p className="text-lg">
                                    Suhu berada pada {data.data["temperature"]}
                                    <span>&deg;C</span>
                                </p>
                            </div>
                            <div className="w-full flex flex-row items-center gap-2">
                                <img
                                    className="w-12"
                                    src="assets/svg/air.svg"
                                    alt="Cloud Icon"
                                />
                                <p className="text-lg">
                                    Kecepatan angin rata-rata berada pada{" "}
                                    {data.data["avg_wind_spd"]}
                                    <span>m/s</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row gap-8">
                        <div className="w-full h-40 bg-[#A7D7C5]/40 shadow-md rounded-lg px-6 py-4">
                            <p className="text-md">
                                Kecepatan Angin Tertinggi:{" "}
                                {data.data["max_wind_spd"]}
                                <span>m/s</span>
                            </p>
                            <p className="text-md">
                                Curah Hujan:{" "}
                                {data.data["rain_fall_ph"]}
                                <span>mm/h</span>
                            </p>
                            <p className="text-md">
                                Curah Hujan:{" "}
                                {data.data["rain_fall_pd"]}
                                <span>mm/d</span>
                            </p>
                            <p className="text-md">
                                Humidity:{" "}
                                {data.data["humidity"]}
                                <span>%</span>
                            </p>
                        </div>
                        <div className="w-full h-40 bg-[#A7D7C5]/40 shadow-md rounded-lg px-6 py-4">
                            <p className="text-md">
                                Tekanan Barometric Sebesar:{" "}
                                {data.data["barometric_pressure"]}
                                <span>hPa</span>
                            </p>
                        </div>
                    </div>
                </section>
                <aside className="w-2/5 h-auto">
                    <div className="w-full h-full bg-[#A7D7C5]/40 shadow-md rounded-lg px-2 py-2">
                        <APIProvider apiKey={googleApiKey}>
                            <Map
                                className="w-full h-full border-2 border-[#A7D7C5]"
                                defaultCenter={{
                                    lat: data.lat,
                                    lng: data.long,
                                }}
                                defaultZoom={18}
                                gestureHandling={"greedy"}
                                // disableDefaultUI={true}
                            >
                                <Marker
                                    position={{
                                        lat: data.lat,
                                        lng: data.long,
                                    }}
                                />
                            </Map>
                        </APIProvider>
                    </div>
                </aside>
            </article>

            <div className="container mx-auto my-8 p-4 rounded h-18">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p>Email: contact@website.com</p>
                <p>Phone: +62 </p>
            </div>
        </Home>
    );
}
