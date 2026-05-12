/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true }, // TODO: fix pre-existing TS errors (mapboxgl types, NavigationControl, implicit any)
  eslint: { ignoreDuringBuilds: true }, // TODO: fix ESLint warnings in FryInfo.tsx
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  experimental: {
    scrollRestoration: true,
    serverComponentsExternalPackages: ["knex"],
  },
  async redirects() {
    return [
      {
        source: "/hotspots/hex/:index",
        destination: "/hex/:index",
        permanent: false,
      },
      {
        source: "/iot/hex/:index",
        destination: "/hex/:index",
        permanent: false,
      },
      {
        source: "/hotspots/:address/activity",
        destination: "/hotspots/:address",
        permanent: false,
      },
      {
        source: "/hotspots/:address/witnessed",
        destination: "/hotspots/:address",
        permanent: false,
      },
      {
        source: "/hotspots/:address/nearby",
        destination: "/hotspots/:address",
        permanent: false,
      },
      {
        source: "/accounts/:address/activity",
        destination: "/accounts/:address",
        permanent: false,
      },
      {
        source: "/accounts/:address/hotspots",
        destination: "/accounts/:address",
        permanent: false,
      },
      {
        source: "/accounts/:address/validators",
        destination: "/accounts/:address",
        permanent: false,
      },
      {
        source: "/market",
        destination: "/stats",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
