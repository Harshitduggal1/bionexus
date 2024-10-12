import CopyPlugin from "copy-webpack-plugin";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  webpack(config, { isServer }) {
    config.plugins.push( 
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/@rdkit/rdkit/dist/RDKit_minimal.wasm",
            to: "static/chunks",
          },
        ],
      }),
    );

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    config.resolve.alias['@'] = path.resolve(__dirname);

    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
        protocol: "https",
      }
    ],
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
