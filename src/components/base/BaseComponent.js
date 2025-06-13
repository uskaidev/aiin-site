/**
 * Base component class that all other components should extend
 * Provides common functionality for Web Components
 */
class BaseComponent extends HTMLElement {
  constructor() {
    super();
    
    // Initialize shadow DOM for style encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Store event listeners for cleanup
    this._eventListeners = new Map();
    
    // Store intervals/timeouts for cleanup
    this._timers = new Set();
  }
  
  /**
   * Lifecycle: Called when element is added to DOM
   */
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }
  
  /**
   * Lifecycle: Called when element is removed from DOM
   */
  disconnectedCallback() {
    this.cleanup();
  }
  
  /**
   * Lifecycle: Called when observed attributes change
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.onAttributeChanged(name, oldValue, newValue);
    }
  }
  
  /**
   * Override in subclasses to define observed attributes
   */
  static get observedAttributes() {
    return [];
  }
  
  /**
   * Override in subclasses to handle attribute changes
   */
  onAttributeChanged(name, oldValue, newValue) {
    // Override in subclasses
  }
  
  /**
   * Render component content - override in subclasses
   */
  render() {
    throw new Error('render() must be implemented in subclass');
  }
  
  /**
   * Setup event listeners - override in subclasses
   */
  setupEventListeners() {
    // Override in subclasses
  }
  
  /**
   * Cleanup resources
   */
  cleanup() {
    // Remove all event listeners
    this._eventListeners.forEach((listener, element) => {
      listener.forEach(({ event, handler, options }) => {
        element.removeEventListener(event, handler, options);
      });
    });
    this._eventListeners.clear();
    
    // Clear all timers
    this._timers.forEach(timer => {
      if (timer.type === 'timeout') {
        clearTimeout(timer.id);
      } else if (timer.type === 'interval') {
        clearInterval(timer.id);
      }
    });
    this._timers.clear();
  }
  
  /**
   * Safe event listener addition with automatic cleanup
   */
  addEventListener(element, event, handler, options) {
    if (!element) return;
    
    element.addEventListener(event, handler, options);
    
    // Store for cleanup
    if (!this._eventListeners.has(element)) {
      this._eventListeners.set(element, []);
    }
    this._eventListeners.get(element).push({ event, handler, options });
  }
  
  /**
   * Safe setTimeout with automatic cleanup
   */
  setTimeout(callback, delay) {
    const id = setTimeout(() => {
      callback();
      this._timers.delete(timer);
    }, delay);
    
    const timer = { type: 'timeout', id };
    this._timers.add(timer);
    
    return id;
  }
  
  /**
   * Safe setInterval with automatic cleanup
   */
  setInterval(callback, delay) {
    const id = setInterval(callback, delay);
    const timer = { type: 'interval', id };
    this._timers.add(timer);
    
    return id;
  }
  
  /**
   * Emit custom event
   */
  emit(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    }));
  }
  
  /**
   * Create element with safe HTML content
   */
  createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else if (key.startsWith('on') && typeof value === 'function') {
        const event = key.substring(2).toLowerCase();
        this.addEventListener(element, event, value);
      } else {
        element.setAttribute(key, value);
      }
    });
    
    // Set content safely
    if (typeof content === 'string') {
      element.textContent = content;
    } else if (content instanceof HTMLElement) {
      element.appendChild(content);
    } else if (Array.isArray(content)) {
      content.forEach(child => {
        if (child instanceof HTMLElement) {
          element.appendChild(child);
        }
      });
    }
    
    return element;
  }
  
  /**
   * Query selector within shadow DOM
   */
  $(selector) {
    return this.shadowRoot.querySelector(selector);
  }
  
  /**
   * Query selector all within shadow DOM
   */
  $$(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }
  
  /**
   * Apply styles to shadow DOM
   */
  applyStyles(css) {
    const style = document.createElement('style');
    style.textContent = css;
    this.shadowRoot.appendChild(style);
  }
  
  
  /**
   * Load external stylesheet into shadow DOM
   */
  loadStylesheet(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    this.shadowRoot.appendChild(link);
  }
  
  /**
   * Sanitize HTML to prevent XSS
   */
  sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
  }
  
  /**
   * Template literal tag for safe HTML
   */
  html(strings, ...values) {
    let result = strings[0];
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      // Escape HTML in values
      const escaped = String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      result += escaped + strings[i + 1];
    }
    return result;
  }
  
  /**
   * Debounce utility
   */
  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = this.setTimeout(() => func.apply(this, args), wait);
    };
  }
  
  /**
   * Throttle utility
   */
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
}

// Export for use in other components
window.BaseComponent = BaseComponent;