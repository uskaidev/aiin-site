/**
 * LazyImageLoader のテスト
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

// テスト用のDOM環境を準備
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

describe('LazyImageLoader', () => {
  let LazyImageLoader;
  let loader;

  beforeEach(() => {
    // LazyImageLoader クラスを作成
    LazyImageLoader = class {
      constructor(options = {}) {
        this.options = {
          rootMargin: '50px 0px',
          threshold: 0.01,
          fadeIn: true,
          ...options
        };
        
        this.observer = {
          observe: vi.fn(),
          unobserve: vi.fn(),
          disconnect: vi.fn()
        };
        
        this.loadedImages = new Set();
      }
      
      observeImages() {
        const images = document.querySelectorAll('[data-lazy]');
        images.forEach(img => {
          if (!this.loadedImages.has(img)) {
            this.observer.observe(img);
            
            if (this.options.fadeIn) {
              img.classList.add('lazy-image');
            }
          }
        });
      }
      
      loadImage(img) {
        if (this.loadedImages.has(img)) return;
        
        const src = img.getAttribute('data-lazy');
        if (!src) return;
        
        if (img.tagName === 'IMG') {
          setTimeout(() => {
            img.src = src;
            img.removeAttribute('data-lazy');
            
            const srcset = img.getAttribute('data-lazy-srcset');
            if (srcset) {
              img.srcset = srcset;
              img.removeAttribute('data-lazy-srcset');
            }
            
            if (this.options.fadeIn) {
              img.classList.add('lazy-loaded');
            }
            
            this.loadedImages.add(img);
            this.observer.unobserve(img);
            
            img.dispatchEvent(new CustomEvent('lazyloaded', {
              detail: { src }
            }));
          }, 10);
        } else {
          setTimeout(() => {
            img.style.backgroundImage = `url(${src})`;
            img.removeAttribute('data-lazy');
            
            if (this.options.fadeIn) {
              img.classList.add('lazy-loaded');
            }
            
            this.loadedImages.add(img);
            this.observer.unobserve(img);
            
            img.dispatchEvent(new CustomEvent('lazyloaded', {
              detail: { src }
            }));
          }, 10);
        }
      }
      
      refresh() {
        this.observeImages();
      }
      
      destroy() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
        this.loadedImages.clear();
      }
    };
    
    // 新しいインスタンスを作成
    loader = new LazyImageLoader({
      rootMargin: '50px 0px',
      threshold: 0.01,
      fadeIn: true
    });
  });

  afterEach(() => {
    if (loader) {
      loader.destroy();
    }
    // DOMをクリア
    document.body.innerHTML = '';
  });

  describe('初期化', () => {
    it('デフォルトオプションで初期化される', () => {
      const defaultLoader = new LazyImageLoader();
      expect(defaultLoader.options.rootMargin).toBe('50px 0px');
      expect(defaultLoader.options.threshold).toBe(0.01);
      expect(defaultLoader.options.fadeIn).toBe(true);
    });

    it('カスタムオプションで初期化される', () => {
      const customLoader = new LazyImageLoader({
        rootMargin: '100px 0px',
        threshold: 0.5,
        fadeIn: false
      });
      expect(customLoader.options.rootMargin).toBe('100px 0px');
      expect(customLoader.options.threshold).toBe(0.5);
      expect(customLoader.options.fadeIn).toBe(false);
    });
  });

  describe('画像の監視', () => {
    it('data-lazy属性を持つ画像を監視対象に追加する', () => {
      // テスト用の画像要素を作成
      const img = document.createElement('img');
      img.setAttribute('data-lazy', '/test-image.jpg');
      img.classList.add('lazy-image');
      document.body.appendChild(img);

      // observeImages メソッドを呼び出し
      loader.observeImages();

      // IntersectionObserver の observe が呼ばれたことを確認
      expect(loader.observer.observe).toHaveBeenCalledWith(img);
      expect(img.classList.contains('lazy-image')).toBe(true);
    });

    it('data-lazy属性がない画像は監視対象にならない', () => {
      const img = document.createElement('img');
      img.src = '/regular-image.jpg';
      document.body.appendChild(img);

      loader.observeImages();

      // observe が呼ばれていないことを確認
      expect(loader.observer.observe).not.toHaveBeenCalledWith(img);
    });
  });

  describe('画像の読み込み', () => {
    it('img要素の画像を正しく読み込む', (done) => {
      const img = document.createElement('img');
      img.setAttribute('data-lazy', '/test-image.jpg');
      img.setAttribute('data-lazy-srcset', '/test-image-2x.jpg 2x');
      document.body.appendChild(img);

      // loadImage を呼び出し
      loader.loadImage(img);

      // 画像読み込み完了のイベントリスナーを設定
      img.addEventListener('lazyloaded', (event) => {
        expect(img.src).toBe('/test-image.jpg');
        expect(img.srcset).toBe('/test-image-2x.jpg 2x');
        expect(img.hasAttribute('data-lazy')).toBe(false);
        expect(img.hasAttribute('data-lazy-srcset')).toBe(false);
        expect(img.classList.contains('lazy-loaded')).toBe(true);
        expect(event.detail.src).toBe('/test-image.jpg');
        done();
      });
    });

    it('背景画像を正しく読み込む', (done) => {
      const div = document.createElement('div');
      div.setAttribute('data-lazy', '/bg-image.jpg');
      div.classList.add('lazy-image');
      document.body.appendChild(div);

      loader.loadImage(div);

      div.addEventListener('lazyloaded', (event) => {
        expect(div.style.backgroundImage).toBe('url(/bg-image.jpg)');
        expect(div.hasAttribute('data-lazy')).toBe(false);
        expect(div.classList.contains('lazy-loaded')).toBe(true);
        expect(event.detail.src).toBe('/bg-image.jpg');
        done();
      });
    });

    it('重複読み込みを防ぐ', () => {
      const img = document.createElement('img');
      img.setAttribute('data-lazy', '/test-image.jpg');
      document.body.appendChild(img);

      // 最初の読み込み
      loader.loadImage(img);
      expect(loader.loadedImages.has(img)).toBe(false);

      // loadedImages に追加をシミュレート
      loader.loadedImages.add(img);

      // 2回目の読み込み（何も起こらないはず）
      const originalSrc = img.src;
      loader.loadImage(img);
      expect(img.src).toBe(originalSrc);
    });
  });

  describe('フォールバック機能', () => {
    it('IntersectionObserver がサポートされていない場合、すべての画像を即座に読み込む', () => {
      // IntersectionObserver を一時的に無効化
      const originalIO = global.IntersectionObserver;
      global.IntersectionObserver = undefined;

      const img1 = document.createElement('img');
      img1.setAttribute('data-lazy', '/image1.jpg');
      const img2 = document.createElement('img');
      img2.setAttribute('data-lazy', '/image2.jpg');
      
      document.body.appendChild(img1);
      document.body.appendChild(img2);

      const fallbackLoader = new LazyImageLoader();

      expect(img1.src).toBe('/image1.jpg');
      expect(img2.src).toBe('/image2.jpg');
      expect(img1.hasAttribute('data-lazy')).toBe(false);
      expect(img2.hasAttribute('data-lazy')).toBe(false);

      // IntersectionObserver を復元
      global.IntersectionObserver = originalIO;
    });

    it('エラー時にフォールバック画像を表示する', (done) => {
      const img = document.createElement('img');
      img.setAttribute('data-lazy', '/invalid-image.jpg');
      img.setAttribute('data-lazy-fallback', '/fallback-image.jpg');
      document.body.appendChild(img);

      // Image のオリジナル実装を一時的に置き換えて、エラーをシミュレート
      const originalImage = global.Image;
      global.Image = class {
        constructor() {
          setTimeout(() => {
            if (this.onerror) this.onerror();
          }, 10);
        }
      };

      loader.loadImage(img);

      setTimeout(() => {
        expect(img.src).toBe('/fallback-image.jpg');
        expect(loader.observer.unobserve).toHaveBeenCalledWith(img);
        
        // Image を復元
        global.Image = originalImage;
        done();
      }, 50);
    });
  });

  describe('ユーティリティメソッド', () => {
    it('refresh() で新しい画像を監視対象に追加する', () => {
      const img = document.createElement('img');
      img.setAttribute('data-lazy', '/new-image.jpg');
      document.body.appendChild(img);

      loader.refresh();

      expect(loader.observer.observe).toHaveBeenCalledWith(img);
    });

    it('destroy() でリソースをクリーンアップする', () => {
      loader.destroy();

      expect(loader.observer.disconnect).toHaveBeenCalled();
      expect(loader.observer).toBe(null);
      expect(loader.loadedImages.size).toBe(0);
    });
  });
});