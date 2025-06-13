/**
 * HTMLサニタイザー
 * XSS攻撃を防ぐための安全なHTML処理を提供
 */

/**
 * 許可するHTMLタグのリスト
 */
const ALLOWED_TAGS = [
  'a', 'b', 'i', 'em', 'strong', 'span', 'p', 'br', 
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
  'div', 'section', 'article', 'header', 'footer', 'nav',
  'img', 'video', 'source'
];

/**
 * 許可する属性のリスト
 */
const ALLOWED_ATTRS = {
  'a': ['href', 'title', 'target', 'rel'],
  'img': ['src', 'alt', 'width', 'height', 'loading'],
  'video': ['src', 'autoplay', 'loop', 'muted', 'playsinline', 'controls'],
  'source': ['src', 'type'],
  '*': ['class', 'id', 'data-*']
};

/**
 * 危険なプロトコルのリスト
 */
const DANGEROUS_PROTOCOLS = ['javascript:', 'data:', 'vbscript:'];

/**
 * HTMLを安全にサニタイズする
 * @param {string} html - サニタイズするHTML文字列
 * @param {Object} options - オプション設定
 * @returns {string} サニタイズされたHTML
 */
export function sanitizeHTML(html, options = {}) {
  const {
    allowedTags = ALLOWED_TAGS,
    allowedAttrs = ALLOWED_ATTRS,
    allowedProtocols = ['http:', 'https:', 'mailto:']
  } = options;

  // DOMParserを使用してHTMLを解析
  const doc = new DOMParser().parseFromString(html, 'text/html');
  
  // 再帰的にノードを処理
  function sanitizeNode(node) {
    // テキストノードはそのまま
    if (node.nodeType === Node.TEXT_NODE) {
      return node;
    }
    
    // 要素ノード
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      
      // 許可されていないタグは削除
      if (!allowedTags.includes(tagName)) {
        return null;
      }
      
      // 新しい要素を作成
      const newElement = document.createElement(tagName);
      
      // 属性を処理
      const attrs = Array.from(node.attributes);
      attrs.forEach(attr => {
        const attrName = attr.name.toLowerCase();
        const attrValue = attr.value;
        
        // グローバル属性のチェック
        const isGlobalAllowed = allowedAttrs['*'] && 
          allowedAttrs['*'].some(pattern => {
            if (pattern.endsWith('*')) {
              return attrName.startsWith(pattern.slice(0, -1));
            }
            return attrName === pattern;
          });
        
        // タグ固有の属性チェック
        const isTagAllowed = allowedAttrs[tagName] && 
          allowedAttrs[tagName].includes(attrName);
        
        if (isGlobalAllowed || isTagAllowed) {
          // URLを含む属性の場合、プロトコルをチェック
          if (['href', 'src'].includes(attrName)) {
            const url = attrValue.trim().toLowerCase();
            const isDangerous = DANGEROUS_PROTOCOLS.some(protocol => 
              url.startsWith(protocol)
            );
            
            if (isDangerous) {
              return; // 危険なプロトコルは無視
            }
          }
          
          newElement.setAttribute(attrName, attrValue);
        }
      });
      
      // 子ノードを処理
      Array.from(node.childNodes).forEach(child => {
        const sanitizedChild = sanitizeNode(child);
        if (sanitizedChild) {
          newElement.appendChild(sanitizedChild);
        }
      });
      
      return newElement;
    }
    
    return null;
  }
  
  // bodyの内容をサニタイズ
  const fragment = document.createDocumentFragment();
  Array.from(doc.body.childNodes).forEach(node => {
    const sanitized = sanitizeNode(node);
    if (sanitized) {
      fragment.appendChild(sanitized);
    }
  });
  
  // サニタイズされたHTMLを文字列として返す
  const div = document.createElement('div');
  div.appendChild(fragment);
  return div.innerHTML;
}

/**
 * 安全にHTMLをエスケープする
 * @param {string} str - エスケープする文字列
 * @returns {string} エスケープされた文字列
 */
export function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * 限定的なマークダウンをHTMLに変換（サニタイズ済み）
 * @param {string} markdown - マークダウン文字列
 * @returns {string} HTML文字列
 */
export function markdownToSafeHTML(markdown) {
  let html = escapeHTML(markdown);
  
  // 基本的なマークダウン変換
  html = html
    // 見出し
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    // 太字
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // イタリック
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // リンク
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // 改行
    .replace(/\n/g, '<br>');
  
  // 最終的にサニタイズして返す
  return sanitizeHTML(html);
}

// デフォルトエクスポート
export default {
  sanitizeHTML,
  escapeHTML,
  markdownToSafeHTML
};