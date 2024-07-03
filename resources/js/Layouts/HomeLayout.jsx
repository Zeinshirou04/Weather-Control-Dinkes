import NavbarTop from "@/Components/NavigationBar";

export default function Home({ children }) {
    return (
        <main className="flex flex-col w-svw items-center h-full">
            <header className="w-full">
                <NavbarTop />
            </header>
            <section className="flex flex-col w-full max-w-6xl py-12 justify-between">{children}</section>
        </main>
    );
}
