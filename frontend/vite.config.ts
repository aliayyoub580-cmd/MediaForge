import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', '*.xml'],
      manifest: {
        name: 'MediaForge Pro',
        short_name: 'MediaForge',
        description: 'Professional Universal Video & Audio Downloader',
        theme_color: '#042B35',
        background_color: '#042B35',
        display: 'standalone',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      workbox: {
        // Crucial Fix: Exclude static XML sitemaps, robots.txt, and API routes from Service Worker SPA fallback
        navigateFallbackDenylist: [
          /^\/api/,
          /\.xml$/,
          /^\/robots\.txt$/,
          /^\/google.*\.html$/
        ],
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: { cacheName: 'api-cache', expiration: { maxEntries: 50, maxAgeSeconds: 300 } }
          }
        ]
      }
    })
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: { proxy: { '/api': { target: 'http://localhost:5000', changeOrigin: true } } }
})
