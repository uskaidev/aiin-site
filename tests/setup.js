/**
 * Vitest セットアップファイル
 * テスト実行前に必要な設定を行う
 */

import { vi } from 'vitest';

// DOMのモック設定
global.console = {
  ...console,
  // テスト中の不要なログを抑制
  warn: vi.fn(),
  error: vi.fn(),
  log: vi.fn()
};

// IntersectionObserver のモック
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// ResizeObserver のモック
global.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// MutationObserver のモック
global.MutationObserver = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn()
}));

// requestAnimationFrame のモック
global.requestAnimationFrame = vi.fn((cb) => {
  setTimeout(cb, 16);
});

global.cancelAnimationFrame = vi.fn();

// カスタム要素のサポートをモック
if (!global.customElements) {
  global.customElements = {
    define: vi.fn(),
    get: vi.fn(),
    whenDefined: vi.fn().mockResolvedValue(undefined)
  };
}

// fetch のモック
global.fetch = vi.fn();

// localStorage のモック
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock;

// sessionStorage のモック
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.sessionStorage = sessionStorageMock;

// Image のモック
global.Image = class {
  constructor() {
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 100);
  }
};

// HTMLCanvasElement のモック
global.HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn()
}));

// テスト環境でのCSS カスタムプロパティ対応
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => ''
  })
});

// matchMedia のモック
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

// URL のモック
global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();

// BaseComponent のモック（実際のクラスがロードされるまで）
if (!global.BaseComponent) {
  global.BaseComponent = class BaseComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._eventListeners = new Map();
      this._timers = new Set();
    }
    
    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }
    
    disconnectedCallback() {
      this.cleanup();
    }
    
    render() {
      // Override in subclasses
    }
    
    setupEventListeners() {
      // Override in subclasses
    }
    
    cleanup() {
      this._eventListeners.clear();
      this._timers.clear();
    }
    
    createElement(tag, attributes = {}, content = '') {
      const element = document.createElement(tag);
      
      Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
          element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
          Object.assign(element.style, value);
        } else {
          element.setAttribute(key, value);
        }
      });
      
      if (typeof content === 'string') {
        element.textContent = content;
      }
      
      return element;
    }
    
    $(selector) {
      return this.shadowRoot.querySelector(selector);
    }
    
    $$(selector) {
      return this.shadowRoot.querySelectorAll(selector);
    }
    
    addEventListener(element, event, handler, options) {
      if (!element) return;
      element.addEventListener(event, handler, options);
      
      if (!this._eventListeners.has(element)) {
        this._eventListeners.set(element, []);
      }
      this._eventListeners.get(element).push({ event, handler, options });
    }
    
    setTimeout(callback, delay) {
      const id = setTimeout(() => {
        callback();
        this._timers.delete(timer);
      }, delay);
      
      const timer = { type: 'timeout', id };
      this._timers.add(timer);
      
      return id;
    }
    
    setInterval(callback, delay) {
      const id = setInterval(callback, delay);
      const timer = { type: 'interval', id };
      this._timers.add(timer);
      
      return id;
    }
    
    emit(eventName, detail = {}) {
      this.dispatchEvent(new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true
      }));
    }
    
    sanitizeHTML(html) {
      const temp = document.createElement('div');
      temp.textContent = html;
      return temp.innerHTML;
    }
    
    debounce(func, wait) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = this.setTimeout(() => func.apply(this, args), wait);
      };
    }
    
    throttle(func, limit) {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          this.setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  };
}