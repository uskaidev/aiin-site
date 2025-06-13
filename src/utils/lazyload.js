/**
 * 画像の遅延読み込みユーティリティ
 * Intersection Observer APIを使用した効率的な画像読み込み
 */

class LazyImageLoader {
  constructor(options = {}) {
    // デフォルトオプション
    this.options = {
      rootMargin: '50px 0px', // 画像が表示される50px前に読み込み開始
      threshold: 0.01, // 1%でも表示されたら読み込み
      fadeIn: true, // フェードインアニメーション
      ...options
    };
    
    // Intersection Observerのインスタンス
    this.observer = null;
    
    // 読み込み済み画像のセット（重複読み込み防止）
    this.loadedImages = new Set();
    
    this.init();
  }
  
  init() {
    // Intersection Observer APIのサポートチェック
    if (!('IntersectionObserver' in window)) {
      console.warn('Intersection Observer API is not supported. Loading all images immediately.');
      this.loadAllImages();
      return;
    }
    
    // Observerの作成
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
        }
      });
    }, {
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold
    });
    
    // 初期化時に既存の画像を監視
    this.observeImages();
  }
  
  /**
   * 画像を監視対象に追加
   */
  observeImages() {
    const images = document.querySelectorAll('[data-lazy]');
    images.forEach(img => {
      if (!this.loadedImages.has(img)) {
        this.observer.observe(img);
        
        // フェードイン用のクラスを追加
        if (this.options.fadeIn) {
          img.classList.add('lazy-image');
        }
      }
    });
  }
  
  /**
   * 単一の画像を読み込む
   */
  loadImage(img) {
    // 既に読み込み済みの場合はスキップ
    if (this.loadedImages.has(img)) return;
    
    // data-lazy属性から実際のsrcを取得
    const src = img.getAttribute('data-lazy');
    if (!src) return;
    
    // 画像の読み込み
    if (img.tagName === 'IMG') {
      // img要素の場合
      const tempImg = new Image();
      tempImg.onload = () => {
        img.src = src;
        img.removeAttribute('data-lazy');
        
        // srcset対応
        const srcset = img.getAttribute('data-lazy-srcset');
        if (srcset) {
          img.srcset = srcset;
          img.removeAttribute('data-lazy-srcset');
        }
        
        // フェードイン
        if (this.options.fadeIn) {
          img.classList.add('lazy-loaded');
        }
        
        // 読み込み完了をマーク
        this.loadedImages.add(img);
        this.observer.unobserve(img);
        
        // カスタムイベントを発火
        img.dispatchEvent(new CustomEvent('lazyloaded', {
          detail: { src }
        }));
      };
      
      tempImg.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        // エラー時のフォールバック画像
        const fallback = img.getAttribute('data-lazy-fallback');
        if (fallback) {
          img.src = fallback;
        }
        this.observer.unobserve(img);
      };
      
      tempImg.src = src;
    } else {
      // 背景画像の場合
      const tempImg = new Image();
      tempImg.onload = () => {
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
      };
      
      tempImg.onerror = () => {
        console.error(`Failed to load background image: ${src}`);
        const fallback = img.getAttribute('data-lazy-fallback');
        if (fallback) {
          img.style.backgroundImage = `url(${fallback})`;
        }
        this.observer.unobserve(img);
      };
      
      tempImg.src = src;
    }
  }
  
  /**
   * すべての画像を即座に読み込む（フォールバック用）
   */
  loadAllImages() {
    const images = document.querySelectorAll('[data-lazy]');
    images.forEach(img => {
      const src = img.getAttribute('data-lazy');
      if (src) {
        if (img.tagName === 'IMG') {
          img.src = src;
          const srcset = img.getAttribute('data-lazy-srcset');
          if (srcset) {
            img.srcset = srcset;
          }
        } else {
          img.style.backgroundImage = `url(${src})`;
        }
        img.removeAttribute('data-lazy');
        img.removeAttribute('data-lazy-srcset');
      }
    });
  }
  
  /**
   * 新しい画像を監視対象に追加
   */
  refresh() {
    this.observeImages();
  }
  
  /**
   * クリーンアップ
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.loadedImages.clear();
  }
}

// シングルトンインスタンスを作成してエクスポート
const lazyImageLoader = new LazyImageLoader();

// DOMContentLoadedで自動初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    lazyImageLoader.refresh();
  });
} else {
  lazyImageLoader.refresh();
}

// MutationObserverで動的に追加された画像も監視
const mutationObserver = new MutationObserver(() => {
  lazyImageLoader.refresh();
});

mutationObserver.observe(document.body, {
  childList: true,
  subtree: true
});

export default lazyImageLoader;