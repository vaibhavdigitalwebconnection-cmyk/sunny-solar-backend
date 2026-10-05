import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    minify: 'oxc',
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      checks: {
        pluginTimings: false,
      },
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
              priority: 20,
            },
            {
              name: 'vendor-framer',
              test: /node_modules[\\/]framer-motion[\\/]/,
              priority: 15,
            },
            {
              name: 'vendor-animation',
              test: /node_modules[\\/](gsap|lenis)[\\/]/,
              priority: 12,
            },
            {
              name: 'vendor-icons',
              test: /node_modules[\\/]lucide-react[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
