/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://cloudbit.com.ar',
  generateRobotsTxt: true, // (Optional)
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
  // Exclude the base locale routes since they are for redirection
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
  ],
  // Custom transform function to handle localized paths
  transform: async (config, path) => {
    // For language-specific paths, generate alternate references
    const alternateRefs = config.alternateRefs.map(ref => {
      // Create the alternate path by replacing the language segment
      // e.g., /es/servicios -> /en/servicios
      const lang = ref.hreflang;
      let newPath = path;
      if (path.startsWith('/es')) {
        newPath = path.replace('/es', `/${lang}`);
      } else if (path.startsWith('/en')) {
        newPath = path.replace('/en', `/${lang}`);
      }
      
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
