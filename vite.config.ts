import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pagesで公開する場合、リポジトリ名に合わせてbaseパスを変更してください
  // 例: リポジトリ名が 'my-knot-site' の場合 → base: '/my-knot-site/'
  // カスタムドメインを使う場合は base: '/' に設定してください
  base: '/mediadesign/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});

