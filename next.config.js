/* eslint-disable require-await */
/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = withImages({
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/lol/:path*',
        destination: 'https://kr.api.riotgames.com/lol/:path*',
      },
      {
        source: '/asia/lol/:path*',
        destination: 'https://asia.api.riotgames.com/lol/:path*',
      },
      {
        source: '/cdn/12.20.1/:path*',
        destination: 'http://ddragon.leagueoflegends.com/:path*',
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
