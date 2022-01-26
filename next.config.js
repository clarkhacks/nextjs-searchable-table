const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});

module.exports = nextConfig;
