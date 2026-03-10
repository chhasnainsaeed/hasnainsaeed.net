import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: isSsrBuild
    ? undefined
    : {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (!id.includes('node_modules')) return undefined

              if (id.includes('react-dom') || id.includes('react-router-dom') || /node_modules[\\/]+react[\\/]/.test(id)) {
                return 'react'
              }

              if (id.includes('lenis')) {
                return 'lenis'
              }

              if (id.includes('react-icons')) {
                return 'icons'
              }

              return undefined
            },
          },
        },
      },
}))
