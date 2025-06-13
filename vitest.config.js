import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    // テスト環境設定
    environment: 'jsdom',
    
    // テストファイルのパターン
    include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
    
    // セットアップファイル
    setupFiles: ['./tests/setup.js'],
    
    // モック設定
    globals: true,
    
    // カバレッジ設定
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.js',
        'dist/',
        'public/',
        'auth.js'
      ]
    },
    
    // タイムアウト設定
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // ファイル変更監視
    watch: true,
    
    // 並列実行
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false
      }
    }
  },
  
  // エイリアス設定（Viteと同じ）
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
      '@styles': resolve(__dirname, './src/styles')
    }
  }
});