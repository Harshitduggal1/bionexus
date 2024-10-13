const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.clerk.com', 'images.unsplash.com'], // Add any other domains you need
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
      };
    }

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/@rdkit/rdkit/dist/RDKit_minimal.wasm',
            to: 'static/chunks',
          },
        ],
      })
    );

    return config;
  },
};

module.exports = nextConfig;