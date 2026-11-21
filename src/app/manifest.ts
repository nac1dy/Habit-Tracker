import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Habito',
    short_name: 'Habito',
    description: 'Track your daily habits',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f5faf9',
    theme_color: '#35b8aa',
    icons: [
      { src: '/Habito192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/Habito512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
