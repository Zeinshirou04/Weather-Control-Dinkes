import NavLink from "./NavLink";

export default function NavbarTop() { 
    return (
        <nav className="bg-[#74B49B] w-full">
            <div className="px-4 h-16 sticky max-w-6xl w-full mx-auto flex">
                <div className="mx-auto w-full flex flex-row justify-between items-center">
                    <NavLink className="border-b-2 hover:border-transparent active:border-transparent focus:border-transparent">
                        <h1 className="text-white text-2xl font-bold">WAC Semarang</h1>
                    </NavLink>
                    <div className="flex flex-row gap-2">
                        <NavLink>
                            <h1 className="text-white text-md font-extralight">Cek Cuaca</h1>
                        </NavLink>
                        <NavLink>
                            <h1 className="text-white text-md font-extralight">Tentang Kami</h1>
                        </NavLink>
                        <NavLink>
                            <h1 className="text-white text-md font-extralight">Bantuan</h1>
                        </NavLink>
                        <button className="bg-white text-black py-1 px-4 rounded-lg transition duration-200 hover:bg-gray-200">
                            <p className="text-md">
                                Login
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
