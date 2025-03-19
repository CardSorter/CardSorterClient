import type { NextConfig } from 'next'
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  distDir: 'build', // Changes the build output directory to `build`
  basePath: '/card-sorter',
  async redirects() {
    return [
      // Redirect no path page to the english locale (note, urls with paths that don't include locales will be handled
      // by the Nextjs middleware
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
  // output: 'standalone', // https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
}

export default withNextIntl(nextConfig)