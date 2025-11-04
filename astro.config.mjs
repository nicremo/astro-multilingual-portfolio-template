import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://garrettheath4.com/',
  output: 'static',
  trailingSlash: 'always',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false, // English pages won't have /en/, German will have /de/
    },
  },

  // Integrations
  integrations: [tailwind(), sitemap(), compress({
    css: true,
    html: true,
    js: true,
    img: {
      quality: 80,
    },
    svg: true,
    logger: 1,
  }), preact({
    compat: true
  })],

  // Built-in image optimization settings
  // Removed image service config as sharp is not a direct project dependency
  // image: {
  //   service: {
  //     entrypoint: 'astro/assets/services/sharp'
  //   }
  // },

  vite: {
    clearScreen: false,

    build: {
      cssCodeSplit: true
    },
    ssr: {
      external: ['aos']
    }
  },

  // Add cache headers for static assets
  headers: {
    '/_astro/*': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ],
    '/assets/*': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ],
    '/*.css': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ],
    '/*.js': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ],
    '/*.webp': [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ]
  }
});
