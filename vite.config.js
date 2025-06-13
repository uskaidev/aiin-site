import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

export default defineConfig({
  // ベースパスの設定（Vercelでのデプロイ時）
  base: '/',
  
  // パブリックディレクトリ
  publicDir: 'public',
  
  // ビルド設定
  build: {
    // 出力ディレクトリ
    outDir: 'dist',
    
    // アセットディレクトリ
    assetsDir: 'assets',
    
    // ソースマップの生成
    sourcemap: true,
    
    // ロールアップオプション
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        promptLibrary: resolve(__dirname, 'prompt-library.html'),
        toolbox: resolve(__dirname, 'toolbox.html')
      },
      output: {
        // コンポーネントごとにチャンクを分割
        manualChunks: {
          'vendor': ['dompurify'],
          'components-base': [
            './src/components/base/BaseComponent.js'
          ],
          'components-common': [
            './src/components/common/Header.js',
            './src/components/common/Footer.js'
          ],
          'components-sections': [
            './src/components/sections/Hero.js',
            './src/components/sections/About.js',
            './src/components/sections/Solutions.js',
            './src/components/sections/Cases.js',
            './src/components/sections/Team.js',
            './src/components/sections/Insight.js',
            './src/components/sections/Toolbox.js',
            './src/components/sections/Contact.js'
          ]
        }
      }
    },
    
    // CSS分割
    cssCodeSplit: true,
    
    // 圧縮設定
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // 開発サーバー設定
  server: {
    port: 3000,
    open: true,
    cors: true,
    
    // APIプロキシ設定
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  },
  
  // プレビューサーバー設定
  preview: {
    port: 4173
  },
  
  // プラグイン
  plugins: [
    // レガシーブラウザサポート
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    })
  ],
  
  // 最適化設定
  optimizeDeps: {
    include: ['dompurify'],
    exclude: ['@vercel']
  },
  
  // エイリアス設定
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './components'),
      '@scripts': resolve(__dirname, './scripts'),
      '@styles': resolve(__dirname, './styles'),
      '@assets': resolve(__dirname, './assets')
    }
  },
  
  // CSS設定
  css: {
    // CSS前処理
    preprocessorOptions: {
      css: {
        charset: false
      }
    },
    
    // PostCSS設定
    postcss: {
      plugins: []
    }
  },
  
  // 環境変数の設定
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
});