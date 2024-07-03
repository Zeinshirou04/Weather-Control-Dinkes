import NavLink from "./NavLink";

export default function NavbarTop() {
    return (
        <nav className="bg-teal-500 w-full">
            <div class="p-4 h-20 sticky max-w-6xl w-full mx-auto">
                <div class="mx-auto w-full flex flex-row justify-between items-center">
                    <NavLink className="border-b-2 hover:border-transparent active:border-transparent focus:border-transparent">
                        <h1 className="text-white text-2xl font-bold">Weather Control</h1>
                    </NavLink>
                    <div className="flex flex-row gap-2">
                        <NavLink>
                            <h1 className="text-white text-xl">Cek Cuaca</h1>
                        </NavLink>
                        <NavLink>
                            <h1 className="text-white text-xl">Tentang Kami</h1>
                        </NavLink>
                        <NavLink>
                            <h1 className="text-white text-xl">Bantuan</h1>
                        </NavLink>
                        <button class="bg-white text-black py-1 px-4 rounded-lg transition duration-200 hover:bg-gray-200">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
