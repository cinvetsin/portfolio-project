// Import your environment variables or other setup
import "./src/env.js";
import { createProxyMiddleware } from 'http-proxy-middleware';

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  // Add custom rewrites or proxy handling here
  async rewrites() {
    return [
      {
        source: '/api/:path*', // The route to match
        destination: 'https://www.dropbox.com/scl/fo/:path*?raw=1', // Target destination URL
      },
    ];
  },
  
  webpack(config, { isServer }) {
    if (!isServer) {
      // Handling for client-side bundle
      config.resolve.fallback = {
        fs: false,
        module: false,
      };
    }
    return config;
  },

  // Additional configuration options can go here
};

export default config;
