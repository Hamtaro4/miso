import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { visit } from 'unist-util-visit';

// ============================================================
// markdown 内の画像パスにベースURL(/miso)を自動付与するプラグイン
// ============================================================
// 例: ![住吉公園](/images/areas/sumiyoshi/park.jpg)
//   → ビルド後は /miso/images/areas/sumiyoshi/park.jpg に変換される
// ============================================================
function rehypeAddBase(base) {
  return () => (tree) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName === 'img' &&
        typeof node.properties?.src === 'string' &&
        node.properties.src.startsWith('/') &&
        !node.properties.src.startsWith(base)
      ) {
        node.properties.src = base + node.properties.src;
      }
    });
  };
}

export default defineConfig({
  site: 'https://Hamtaro4.github.io',
  base: '/miso',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/draft/'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeAddBase('/miso')],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    remotePatterns: [],
  },
});
