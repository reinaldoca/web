/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://cloudbit.com.ar',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://cloudbit.com.ar/sitemap.xml',
    ],
  },
  // Generar alternateRefs para las rutas de idiomas
  alternateRefs: [
    {
      href: 'https://cloudbit.com.ar/es',
      hreflang: 'es',
    },
    {
      href: 'https://cloudbit.com.ar/en',
      hreflang: 'en',
    },
  ],
  // Excluir rutas que no queremos en el sitemap
  exclude: ['/es', '/en'],
  // Personalizar cómo se generan las URLs
  transform: async (config, path) => {
    // Para las rutas de idioma, genera las referencias alternativas
    const alternateRefs = config.alternateRefs.map(ref => {
      // Reemplaza el prefijo de idioma base con el del path actual
      // por ejemplo, /es/servicios -> /en/servicios
      const lang = ref.hreflang;
      const newPath = path.startsWith('/es') ? path.replace(/^\/es/, `/${lang}`) : path.replace(/^\/en/, `/${lang}`);
      
      return {
        ...ref,
        href: `${config.siteUrl}${newPath}`,
        hrefIsAbsolute: true,
      };
    });

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: path.startsWith('/es') || path.startsWith('/en') ? alternateRefs : [],
    }
  },
};
