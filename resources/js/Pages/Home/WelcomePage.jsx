import { Head } from "@inertiajs/react";
import Home from "@/Layouts/HomeLayout";

export default function Welcome() {
    return (
        <Home>

            <Head title="Pantau Cuaca Kotamu!" />

            <div class="grow mx-auto flex flex-col w-2/3 items-center">
                <div class="w-full p-4 bg-teal-100/10">
                    <div class="container mx-auto my-8">
                        <div class="carousel relative shadow-2xl bg-black">
                            <div class="carousel-inner relative overflow-hidden w-full">
                                <div class="carousel-item active float-left w-full">
                                    <img
                                        src="assets/img/smg1.jpg"
                                        class="block w-full"
                                        alt="Pemandangan Kota Semarang"
                                    />
                                </div>
                                {/* <div class="carousel-item active float-left w-full">
                                    <img
                                        src="assets/img/smg2.jpg"
                                        class="block w-full"
                                        alt="Pemandangan Kota Semarang"
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mx-auto my-8 p-4  rounded">
                <h2 class="text-2xl font-bold mb-4">
                    Deskripsi Singkat Website
                </h2>
                <p>Deskripsi singkat mengenai tujuan dan fungsi website ini.</p>
            </div>

            <div class="container mx-auto my-8 p-4  rounded">
                <h2 class="text-2xl font-bold mb-4">Fungsi Website</h2>
                <ul class="list-disc list-inside">
                    <li>Fungsi 1</li>
                    <li>Fungsi 2</li>
                    <li>Fungsi 3</li>
                </ul>
            </div>

            <div class="container mx-auto my-8 p-4  rounded">
                <h2 class="text-2xl font-bold mb-4">Kerjasama</h2>
                <div class="flex space-x-4">
                    <img
                        src="assets/img/logoUdinus.png"
                        alt="Udinus Logo"
                        class="h-16"
                    />
                    <img
                        src="assets/img/logoDinkes.png"
                        alt="Dinkes Logo"
                        class="h-16"
                    />
                </div>
            </div>

            <div class="container mx-auto my-8 p-4  rounded">
                <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
                <p>Email: contact@website.com</p>
                <p>Phone: +62 </p>
            </div>
        </Home>
    );
}
