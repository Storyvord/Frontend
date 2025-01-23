/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "**" },
      { protocol: "https", hostname: "storyvord.com", pathname: "**" },
      { protocol: "https", hostname: "content.skyscnr.com", pathname: "**" },
      { protocol: "https", hostname: "logos.skyscnr.com", pathname: "**" },
      { protocol: "https", hostname: "storyvordblob.blob.core.windows.net", pathname: "**" },
      { protocol: "https", hostname: "storyvorddevblob.blob.core.windows.net", pathname: "**" },
      { protocol: "https", hostname: "assets.aceternity.com", pathname: "**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Applies to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
};

// Combine both plugins
export default withBundleAnalyzer(withNextIntl(nextConfig));
