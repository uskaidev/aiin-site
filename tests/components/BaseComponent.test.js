/**
 * BaseComponent のテスト
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

// テスト用のDOM環境を準備
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.HTMLElement = dom.window.HTMLElement;
global.CustomEvent = dom.window.CustomEvent;

describe('BaseComponent', () => {
  let BaseComponent;
  let TestComponent;

  beforeEach(async () => {
    // BaseComponent を使用
    BaseComponent = global.BaseComponent;

    // テスト用のコンポーネントクラスを作成
    TestComponent = class extends BaseComponent {
      static get observedAttributes() {
        return ['test-attr'];
      }

      render() {
        const div = this.createElement('div', { 
          className: 'test-content' 
        }, 'Test Content');
        this.shadowRoot.appendChild(div);
      }

      onAttributeChanged(name, oldValue, newValue) {
        if (name === 'test-attr') {
          this.testAttrValue = newValue;
        }
      }

      getStyles() {
        return `
          .test-content {
            color: red;
            font-size: 16px;
          }
        `;
      }
    };

    // カスタム要素として登録
    if (!customElements.get('test-component')) {
      customElements.define('test-component', TestComponent);
    }
  });

  afterEach(() => {
    // DOMをクリア
    document.body.innerHTML = '';
  });

  describe('初期化', () => {
    it('Shadow DOMが正しく初期化される', () => {
      const component = new TestComponent();
      expect(component.shadowRoot).toBeTruthy();
      expect(component.shadowRoot.mode).toBe('open');
    });

    it('イベントリスナーマップが初期化される', () => {
      const component = new TestComponent();
      expect(component._eventListeners).toBeInstanceOf(Map);
      expect(component._timers).toBeInstanceOf(Set);
    });
  });

  describe('ライフサイクル', () => {
    it('connectedCallback で render と setupEventListeners が呼ばれる', () => {
      const component = new TestComponent();
      const renderSpy = vi.spyOn(component, 'render');
      const setupSpy = vi.spyOn(component, 'setupEventListeners');

      document.body.appendChild(component);

      expect(renderSpy).toHaveBeenCalled();
      expect(setupSpy).toHaveBeenCalled();
    });

    it('disconnectedCallback で cleanup が呼ばれる', () => {
      const component = new TestComponent();
      document.body.appendChild(component);
      
      const cleanupSpy = vi.spyOn(component, 'cleanup');
      document.body.removeChild(component);

      expect(cleanupSpy).toHaveBeenCalled();
    });

    it('attributeChangedCallback で onAttributeChanged が呼ばれる', () => {
      const component = new TestComponent();
      const attrChangedSpy = vi.spyOn(component, 'onAttributeChanged');

      component.attributeChangedCallback('test-attr', 'old', 'new');

      expect(attrChangedSpy).toHaveBeenCalledWith('test-attr', 'old', 'new');
      expect(component.testAttrValue).toBe('new');
    });
  });

  describe('DOM操作メソッド', () => {
    let component;

    beforeEach(() => {
      component = new TestComponent();
      document.body.appendChild(component);
    });

    it('createElement で要素が正しく作成される', () => {
      const div = component.createElement('div', {
        className: 'test-class',
        id: 'test-id',
        'data-test': 'value'
      }, 'Hello World');

      expect(div.tagName).toBe('DIV');
      expect(div.className).toBe('test-class');
      expect(div.id).toBe('test-id');
      expect(div.getAttribute('data-test')).toBe('value');
      expect(div.textContent).toBe('Hello World');
    });

    it('createElement でスタイルオブジェクトが適用される', () => {
      const div = component.createElement('div', {
        style: {
          color: 'red',
          fontSize: '16px'
        }
      });

      expect(div.style.color).toBe('red');
      expect(div.style.fontSize).toBe('16px');
    });

    it('$ で Shadow DOM内の要素を取得できる', () => {
      const testContent = component.$('.test-content');
      expect(testContent).toBeTruthy();
      expect(testContent.textContent).toBe('Test Content');
    });

    it('$$ で Shadow DOM内の複数要素を取得できる', () => {
      // 追加の要素を作成
      const div1 = component.createElement('div', { className: 'multiple' });
      const div2 = component.createElement('div', { className: 'multiple' });
      component.shadowRoot.appendChild(div1);
      component.shadowRoot.appendChild(div2);

      const elements = component.$$('.multiple');
      expect(elements.length).toBe(2);
    });
  });

  describe('イベント管理', () => {
    let component;

    beforeEach(() => {
      component = new TestComponent();
      document.body.appendChild(component);
    });

    it('addEventListener でイベントリスナーが追加される', () => {
      const button = component.createElement('button');
      const handler = vi.fn();

      component.addEventListener(button, 'click', handler);

      // イベントをシミュレート
      button.click();
      expect(handler).toHaveBeenCalled();

      // リスナーが内部リストに追加されていることを確認
      expect(component._eventListeners.has(button)).toBe(true);
    });

    it('cleanup でイベントリスナーが削除される', () => {
      const button = component.createElement('button');
      const handler = vi.fn();
      
      component.addEventListener(button, 'click', handler);
      
      // クリーンアップ実行
      component.cleanup();

      // イベントをシミュレート（ハンドラーが呼ばれないことを確認）
      button.click();
      expect(handler).not.toHaveBeenCalled();

      // 内部リストがクリアされていることを確認
      expect(component._eventListeners.size).toBe(0);
    });
  });

  describe('タイマー管理', () => {
    let component;

    beforeEach(() => {
      component = new TestComponent();
      document.body.appendChild(component);
    });

    it('setTimeout が正しく動作する', (done) => {
      const callback = vi.fn(() => {
        expect(callback).toHaveBeenCalled();
        done();
      });

      component.setTimeout(callback, 10);
    });

    it('setInterval が正しく動作する', (done) => {
      let count = 0;
      const callback = vi.fn(() => {
        count++;
        if (count === 2) {
          expect(callback).toHaveBeenCalledTimes(2);
          done();
        }
      });

      component.setInterval(callback, 10);
    });

    it('cleanup でタイマーがクリアされる', () => {
      const callback = vi.fn();
      
      component.setTimeout(callback, 1000);
      component.setInterval(callback, 1000);

      expect(component._timers.size).toBe(2);

      component.cleanup();

      expect(component._timers.size).toBe(0);
    });
  });

  describe('ユーティリティメソッド', () => {
    let component;

    beforeEach(() => {
      component = new TestComponent();
      document.body.appendChild(component);
    });

    it('emit でカスタムイベントが発火される', () => {
      const handler = vi.fn();
      component.addEventListener('custom-event', handler);

      component.emit('custom-event', { test: 'data' });

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail).toEqual({ test: 'data' });
    });

    it('sanitizeHTML で HTML がエスケープされる', () => {
      const html = '<script>alert("xss")</script><p>Safe content</p>';
      const sanitized = component.sanitizeHTML(html);
      
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('&lt;script&gt;');
    });

    it('debounce で関数が正しく遅延実行される', (done) => {
      const callback = vi.fn();
      const debouncedFn = component.debounce(callback, 100);

      // 複数回連続で呼び出し
      debouncedFn();
      debouncedFn();
      debouncedFn();

      // 100ms後に1回だけ実行されることを確認
      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(1);
        done();
      }, 150);
    });

    it('throttle で関数が正しくスロットリングされる', (done) => {
      const callback = vi.fn();
      const throttledFn = component.throttle(callback, 100);

      // 短時間で複数回呼び出し
      throttledFn();
      throttledFn();
      throttledFn();

      // 最初の1回だけ実行されることを確認
      expect(callback).toHaveBeenCalledTimes(1);

      // 100ms後に再度呼び出し可能になることを確認
      setTimeout(() => {
        throttledFn();
        expect(callback).toHaveBeenCalledTimes(2);
        done();
      }, 150);
    });
  });
});