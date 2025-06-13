# リファクタリング計画書

## プロジェクト概要
- **技術スタック**: Web Components + バニラJavaScript
- **ホスティング**: Vercel
- **現状**: 静的サイトとして動作中、基本構造は整っているがセキュリティと品質面で改善が必要

## 現状の主要な問題点

### 1. 🔴 セキュリティ（緊急度：最高）
- **認証システムの脆弱性**: sessionStorageのみに依存、容易に偽装可能
- **XSS脆弱性**: 多くのコンポーネントでinnerHTMLを直接使用
- **JSONP使用**: PromptLibraryDetailでセキュリティリスク

### 2. 🟠 コード品質（緊急度：高）
- **ES6+機能の限定的使用**: モジュールシステム未使用、async/awaitの部分的使用
- **エラーハンドリング不足**: ネットワークエラーやDOM操作エラーの処理なし
- **型安全性なし**: TypeScriptやJSDocによる型注釈なし

### 3. 🟡 プロジェクト構造（緊急度：中）
- **ファイル散在**: ルートディレクトリに多数のファイル
- **CSS重複**: 同じスタイルが複数箇所で定義
- **ビルドプロセスなし**: 最適化、圧縮、バンドリングなし

## リファクタリング実施計画

### Phase 1: 緊急対応（1-2週間）

#### 1.1 セキュリティ修正
```javascript
// 対象ファイル: auth.js
// 実装内容:
// - JWT + HTTP-onlyクッキーによる認証
// - バックエンドAPIエンドポイントの追加
// - セッション管理の強化
```

#### 1.2 XSS対策
```javascript
// 全コンポーネントファイル対象
// 実装内容:
// - DOMPurifyライブラリの導入
// - innerHTMLをtextContentまたはcreateElementに置換
// - BaseComponent.jsのsanitizeHTMLメソッド活用
```

#### 1.3 JSONP廃止
```javascript
// 対象ファイル: components/PromptLibraryDetail.js
// 実装内容:
// - JSONP通信をfetch APIに変更
// - CORS対応のAPIエンドポイント実装
```

### Phase 2: 基盤整備（2-3週間）

#### 2.1 開発環境構築
```json
// package.json更新
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.{js,css,html}"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "eslint": "^8.50.0",
    "prettier": "^3.0.0"
  }
}
```

#### 2.2 ディレクトリ構造改善
```
/src/
├── components/
│   ├── base/
│   │   └── BaseComponent.js
│   ├── common/
│   │   ├── IconButton.js
│   │   ├── ModalDialog.js
│   │   └── CardComponent.js
│   └── sections/
│       ├── Header.js
│       ├── Hero.js
│       └── ...
├── styles/
│   ├── base/
│   │   ├── _variables.css
│   │   ├── _reset.css
│   │   └── _typography.css
│   ├── components/
│   └── layout/
├── scripts/
│   ├── auth/
│   └── utils/
└── pages/
```

#### 2.3 CSS構造化
```css
/* styles/base/_variables.css */
:root {
  /* カラーパレット */
  --primary: #5D87FF;
  --secondary: #49BEFF;
  
  /* スペーシング */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 3rem;
  
  /* フォントサイズ */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
}
```

### Phase 3: 最適化（3-4週間）

#### 3.1 パフォーマンス改善
- 画像の遅延読み込み実装
- Critical CSSの分離
- コード分割とバンドル最適化
- Web Workersの活用検討

#### 3.2 コード品質向上
- ES6モジュールシステムへの完全移行
- TypeScriptの段階的導入
- ユニットテストの追加（Vitest）
- E2Eテストの実装（Playwright）

#### 3.3 UI/UX改善
- ローディング状態の実装
- エラー表示UIの統一
- アクセシビリティ対応（ARIA属性、キーボードナビゲーション）
- プログレッシブエンハンスメント

## 実装優先順位

| タスク | 影響度 | 緊急度 | 実装難易度 | 開始予定 |
|--------|--------|--------|------------|----------|
| 認証セキュリティ修正 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 即時 |
| XSS対策 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | 即時 |
| 開発環境構築 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | Week 2 |
| CSS構造化 | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | Week 3 |
| パフォーマンス最適化 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | Week 5 |
| TypeScript導入 | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | Week 6 |

## 成功指標

### セキュリティ
- [ ] 全ての認証がサーバーサイドで検証される
- [ ] XSS脆弱性ゼロ（セキュリティスキャンで確認）
- [ ] セキュアな通信プロトコルの使用

### パフォーマンス
- [ ] Lighthouse スコア 90以上
- [ ] First Contentful Paint < 1.5秒
- [ ] Time to Interactive < 3秒

### コード品質
- [ ] ESLintエラー0
- [ ] テストカバレッジ 80%以上
- [ ] TypeScript採用率 50%以上

## リスクと対策

### リスク1: 本番環境への影響
**対策**: 
- 段階的なリリース戦略
- フィーチャーフラグの使用
- ロールバック計画の準備

### リスク2: 開発期間の延長
**対策**:
- 最小限の変更から開始
- 優先順位の明確化
- 定期的な進捗レビュー

### リスク3: 技術的負債の増加
**対策**:
- リファクタリング前のドキュメント化
- コードレビューの徹底
- 自動テストの充実

## 次のステップ

1. **即時実行**:
   - セキュリティ脆弱性の修正開始
   - リファクタリング用ブランチの作成

2. **1週間以内**:
   - 開発環境の構築
   - チーム内でのレビューと承認

3. **2週間以内**:
   - Phase 1の完了
   - Phase 2の開始

---

最終更新日: 2025年6月13日
作成者: Claude Code