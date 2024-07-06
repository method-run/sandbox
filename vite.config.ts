
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react-swc'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {enforce: 'pre', ...mdx({remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter]})},
    react()
  ],
  base: '/sandbox',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        experiments: resolve(__dirname, 'index.html'),
      },
    },
  }
})
