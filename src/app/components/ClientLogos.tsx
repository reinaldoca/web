import { Cloud } from "lucide-react";

const clients = Array.from({ length: 6 }).map((_, i) => ({
    name: `Se nuestro primer Cliente`,
    logo: Cloud,
}));

export function ClientLogos() {
    return (
        <section className="py-12 border-y bg-muted/30 overflow-hidden">
            <div className="container">
                <p className="text-center text-sm font-medium text-muted-foreground mb-8">
                    CON LA CONFIANZA DE EMPRESAS LÍDERES
                </p>
                <div className="relative w-full mask-image-linear-gradient-to-r from-transparent via-black to-transparent overflow-hidden">
                    <div
                        className="flex w-max gap-8 animate-scroll hover:[animation-play-state:paused] will-change-transform"
                        style={{
                            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
                        }}
                    >
                        {[...clients, ...clients].map((client, index) => (
                            <div key={index} className="flex items-center gap-2 min-w-[150px] justify-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                <client.logo className="h-8 w-8" />
                                <span className="font-bold text-lg">{client.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
