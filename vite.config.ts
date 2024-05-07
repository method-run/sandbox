
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react-swc'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {enforce: 'pre', ...mdx({remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter]})},
    react()
  ],
  base: 'sandbox'
})
