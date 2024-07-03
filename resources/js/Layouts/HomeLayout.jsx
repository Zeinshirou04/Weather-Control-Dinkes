import NavbarTop from "@/Components/NavigationBar";

export default function Home({ children }) {
    return (
        <section className="flex flex-col w-full">
            <NavbarTop />
            
            {children}
        </section>
    );
}