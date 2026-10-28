import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

/** Marco común de las páginas internas: header fijo, contenido y footer. */
export function SiteShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main id="main-content" className="flex min-h-screen flex-col overflow-x-clip">
                {children}
            </main>
            <Footer />
        </>
    );
}
