import { resolve } from 'path'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')
const publicDir = resolve(__dirname, 'public')

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  root,
  publicDir,
  build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(root, 'index.html'),
          about: resolve(root, 'about', 'index.html'),
        }
      }
  }
}

export default config;