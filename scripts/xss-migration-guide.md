# XSS脆弱性対策 移行ガイド

## 概要
このガイドは、プロジェクト内のXSS脆弱性を段階的に修正するための手順書です。

## 修正済みコンポーネント
- [x] Hero.js - DOM操作に変更済み
- [x] About.js - DOM操作に変更済み

## 未修正コンポーネント（優先度順）
### 高優先度
1. [ ] Contact.js - フォーム入力を扱うため
2. [ ] PromptLibraryDetail.js - JSONP使用
3. [ ] ToolboxDetail.js - 外部コンテンツ表示

### 中優先度
4. [ ] Solutions.js
5. [ ] Cases.js
6. [ ] Team.js
7. [ ] Services.js
8. [ ] Insight.js
9. [ ] Toolbox.js

### 低優先度
10. [ ] Header.js
11. [ ] Footer.js
12. [ ] FAQ.js
13. [ ] Benefits.js

## 移行手順

### 1. innerHTML使用箇所の特定
```javascript
// 変更前
this.innerHTML = `<div>${content}</div>`;

// 変更後
const div = document.createElement('div');
div.textContent = content;
this.appendChild(div);
```

### 2. 動的HTMLが必要な場合
```javascript
// sanitizer.jsを使用
import { sanitizeHTML } from '../scripts/utils/sanitizer.js';

const cleanHTML = sanitizeHTML(userContent);
element.innerHTML = cleanHTML;
```

### 3. SVGアイコンの処理
```javascript
// SVGは安全なので、専用のヘルパー関数を使用
function createSVGIcon(svgString) {
  const span = document.createElement('span');
  span.innerHTML = svgString; // SVGのみ許可
  return span.firstChild;
}
```

### 4. テンプレートの分離
```javascript
// 大きなHTMLブロックは別メソッドに分離
createCardElement(data) {
  const card = document.createElement('div');
  card.className = 'card';
  
  const title = document.createElement('h3');
  title.textContent = data.title;
  
  const content = document.createElement('p');
  content.textContent = data.content;
  
  card.appendChild(title);
  card.appendChild(content);
  
  return card;
}
```

## チェックリスト
- [ ] innerHTMLの使用を削除
- [ ] ユーザー入力は必ずtextContentまたはsanitizeHTML経由
- [ ] イベントハンドラはaddEventListenerを使用
- [ ] 外部コンテンツはサニタイズ
- [ ] CSPヘッダーの設定を確認

## 次のステップ
1. Contact.jsから順番に修正
2. 各コンポーネント修正後にテスト
3. 全コンポーネント完了後、セキュリティスキャン実施