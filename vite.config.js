import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes asset paths relative, so the build works on GitHub Pages
// regardless of the repository name (user.github.io/repo-name/).
export default defineConfig({
  plugins: [react()],
  base: './',
})
