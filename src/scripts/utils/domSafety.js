/**
 * DOM安全性ユーティリティ
 * XSS対策のためのセキュアなDOM操作メソッドを提供
 */

/**
 * HTMLを安全にエスケープする
 * @param {string} str - エスケープする文字列
 * @returns {string} エスケープされた文字列
 */
export function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * 安全なHTML要素を作成する
 * @param {string} tag - タグ名
 * @param {Object} attrs - 属性オブジェクト
 * @param {string|Element|Element[]} children - 子要素
 * @returns {Element} 作成された要素
 */
export function createElement(tag, attrs = {}, children = null) {
    const element = document.createElement(tag);
    
    // 属性を設定
    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else if (key === 'data' && typeof value === 'object') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else {
            element.setAttribute(key, value);
        }
    });
    
    // 子要素を追加
    if (children !== null) {
        if (typeof children === 'string') {
            element.textContent = children;
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else if (child instanceof Element) {
                    element.appendChild(child);
                }
            });
        } else if (children instanceof Element) {
            element.appendChild(children);
        }
    }
    
    return element;
}

/**
 * 安全にHTMLコンテンツを設定する
 * @param {Element} element - 対象要素
 * @param {string} content - 設定するコンテンツ
 * @param {boolean} allowHtml - HTMLを許可するか（デフォルト: false）
 */
export function setContent(element, content, allowHtml = false) {
    if (!element) return;
    
    if (allowHtml) {
        // HTMLを許可する場合は、サニタイズ処理を推奨
        console.warn('HTMLコンテンツの設定にはセキュリティリスクがあります。DOMPurifyの使用を推奨します。');
        element.innerHTML = content;
    } else {
        element.textContent = content;
    }
}

/**
 * 要素を安全にクリアする
 * @param {Element} element - クリアする要素
 */
export function clearElement(element) {
    if (!element) return;
    
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * 複数の要素を作成するヘルパー
 * @param {Array} elements - 要素定義の配列
 * @returns {DocumentFragment} 作成された要素を含むDocumentFragment
 */
export function createElements(elements) {
    const fragment = document.createDocumentFragment();
    
    elements.forEach(({ tag, attrs, children }) => {
        const element = createElement(tag, attrs, children);
        fragment.appendChild(element);
    });
    
    return fragment;
}

/**
 * テンプレートリテラルからセーフなHTML要素を作成
 * @param {TemplateStringsArray} strings - テンプレート文字列
 * @param {...any} values - 補間値
 * @returns {DocumentFragment} 作成された要素
 */
export function html(strings, ...values) {
    const template = document.createElement('template');
    const html = strings.reduce((acc, str, i) => {
        const value = values[i] || '';
        return acc + str + escapeHtml(String(value));
    }, '');
    
    template.innerHTML = html;
    return template.content;
}

/**
 * クラス名を条件付きで生成
 * @param {...(string|Object)} args - クラス名または条件オブジェクト
 * @returns {string} 生成されたクラス名
 */
export function classNames(...args) {
    return args
        .filter(Boolean)
        .map(arg => {
            if (typeof arg === 'string') return arg;
            if (typeof arg === 'object') {
                return Object.entries(arg)
                    .filter(([_, value]) => value)
                    .map(([key]) => key)
                    .join(' ');
            }
            return '';
        })
        .join(' ')
        .trim();
}

// デフォルトエクスポート
export default {
    escapeHtml,
    createElement,
    setContent,
    clearElement,
    createElements,
    html,
    classNames
};