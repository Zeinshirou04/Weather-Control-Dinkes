import { Head } from "@inertiajs/react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

import Home from "@/Layouts/HomeLayout";

export default function Welcome() {
    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1152,
            },
            items: 1,
        },
    };

    axios
        .get(
            "https://newsdata.io/api/1/latest?apikey=pub_4786655fa8d619a9dadf8d21dced948677e52&country=id&q=cuaca"
        )
        .then((response) => {
            console.log(response.data);
        });
    
    axios.get("https://weather.robotlintang.id/api/device/71f913f7-821b-3b2b-9494-79e2cd0a9856", {
        // data: '71f913f7-821b-3b2b-9494-79e2cd0a9856'
        headers: {
            "User-Agent": 'Axios'
        }
    }).then((response) => {
        console.log(response.data);
    })

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
            {/* aee14bb439214f9ca918ba2c6ce6838d */}
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
                <section className="w-3/4 flex flex-col gap-8">
                    <div className="w-full h-40 bg-[#A7D7C5]/40 shadow-md rounded-lg"></div>
                    <div className="w-full flex flex-row gap-8">
                        <div className="w-full h-40 bg-[#A7D7C5]/40 shadow-md rounded-lg"></div>
                        <div className="w-full h-40 bg-[#A7D7C5]/40 shadow-md rounded-lg"></div>
                    </div>
                </section>
                <aside className="w-1/4">
                    <div className="w-full h-40 bg-[#A7D7C5]/40 shadow-md rounded-lg"></div>
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
