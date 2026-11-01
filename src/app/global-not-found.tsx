import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | CloudBit",
  robots: { index: false, follow: true },
};

/** 404 para URLs que no coinciden con ninguna ruta; con dos layouts raíz no hay uno común. */
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nb-sky">404</p>
          <h1 className="text-3xl font-bold text-white md:text-5xl">Página no encontrada</h1>
          <p lang="en" className="text-nb-text">Page not found</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-nb-dark">
              Volver al inicio
            </Link>
            <Link href="/en" lang="en" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white">
              Go to homepage
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
