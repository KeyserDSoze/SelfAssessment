import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'og-cover-v2.jpg'],
      manifest: {
        name: 'SelfAssessment',
        short_name: 'SelfAssessment',
        description: 'Local-first self-assessment workspace for security, governance and adoption journeys.',
        theme_color: '#0b1730',
        background_color: '#081120',
        display: 'standalone',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,ico,json}']
      }
    })
  ]
});
