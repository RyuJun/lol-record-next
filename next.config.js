/* eslint-disable require-await */
/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const apiKey = 'RGAPI-4b3d4787-b483-40be-a4c7-52e2fe280f80';

const nextConfig = withImages({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/lol/:path*',
        destination: 'https://kr.api.riotgames.com/lol/:path*',
      },
    ];
  },
  trailingSlash: true,
  fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
  experimental: {
    scrollRestoration: true,
  },
  webpack(config) {
    config.resolve.alias['@'] = '/src';
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
  images: {
    disableStaticImages: true,
    path: '',
    loader: 'akamai',
  },
});

module.exports = nextConfig;
