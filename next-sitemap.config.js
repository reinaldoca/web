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
  },
  // Excluir rutas base de idioma que no son páginas reales
  exclude: ['/es', '/en'],
  // Generate alternate refs for language routes
  alternateRefs: [
    {
      href: 'https://cloudbit.com.ar/es',
      hreflang: 'es',
    },
    {
      href: 'https://cloudbit.com.ar/en',
      hreflang: 'en',
    },
    // Añade más idiomas si es necesario
  ],
  // Custom transform function to handle localized paths
  transform: async (config, path) => {
    // Para rutas específicas de idioma, generar referencias alternativas
    const alternateRefs = config.alternateRefs.map(ref => {
      const lang = ref.hreflang;
      let newPath = path;

      // Asegurarse de que estamos transformando una ruta localizada
      const currentLangSegment = path.split('/')[1];
      if (config.alternateRefs.some(alt => alt.hreflang === currentLangSegment)) {
          newPath = path.replace(`/${currentLangSegment}`, `/${lang}`);
      }
      
      return {
        ...ref,
        href: `${config.siteUrl}${newPath}`,
        hrefIsAbsolute: true,
      };
    });

    const isLocalizedPath = config.alternateRefs.some(alt => path.startsWith(`/${alt.hreflang}`));

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: isLocalizedPath ? alternateRefs : [],
    }
  },
};
