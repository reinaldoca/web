/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    // Optimizaciones para imágenes
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Optimizaciones del compilador
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Headers de seguridad
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ],
  // Compresión
  compress: true,
  // Remover header powered-by
  poweredByHeader: false,
};

export default nextConfig;