/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // This app has its own lockfile; pin tracing here so Next doesn't walk up
  // to the lockfile in the home directory.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
