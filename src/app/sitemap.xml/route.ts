
import { i18n } from '@/dictionaries/i18n-config';

const URL = 'https://cloudbit.com.ar';

function generateSiteMap(pages: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
     ${pages
       .map((page) => {
        const path = page === '' ? '' : `/${page}`;
        return i18n.locales
          .map(
            (locale) => `
      <url>
          <loc>${`${URL}/${locale}${path}`}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          ${i18n.locales
            .map(
              (altLocale) =>
                `<xhtml:link rel="alternate" hreflang="${altLocale}" href="${`${URL}/${altLocale}${path}`}"/>`
            )
            .join('')}
      </url>
    `
          )
          .join('');
       })
       .join('')}
   </urlset>
 `;
}

export async function GET() {
  // Define tus páginas estáticas aquí.
  // La página de inicio se representa con una cadena vacía.
  const pages = ['', 'servicios', 'por-que-elegirnos', 'casos-de-exito', 'contacto'];
  const sitemap = generateSiteMap(pages);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
