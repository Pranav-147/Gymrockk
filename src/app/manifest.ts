import type { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gymmrock',
    short_name: 'Gymmrok',
    description: 'Scale you body',
    start_url: '/',
    display: 'standalone',
    
    icons: [
      {
        src: "/logo1.png",
        sizes: '1028x1028',
        type: 'image/png',
      },
      {
        src: "/logo1.png",
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}