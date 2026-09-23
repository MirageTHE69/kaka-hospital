/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // WebP only: concurrent AVIF encoding stalled the image optimiser under load (and is slow/CPU-heavy).
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      // Old WordPress helpers that should not 404 after migration
      { source: "/services/", destination: "/our-services/", permanent: true },
      { source: "/contact-us/", destination: "/contacts-us/", permanent: true },
      { source: "/contact/", destination: "/contacts-us/", permanent: true },
      { source: "/doctor/", destination: "/meet-our-doctors/", permanent: true },
      { source: "/feed/", destination: "/blog/", permanent: false },
      { source: "/author/:slug/", destination: "/blog/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
