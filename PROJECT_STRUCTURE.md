# プロジェクト構造 更新ガイド

## 現在の進捗状況

### ✅ 完了したタスク

#### 1. セキュリティ修正
- **XSS対策**
  - Hero.js, About.js, Contact.js をDOM操作に変更
  - domSafety.js, sanitizer.js ユーティリティを作成
  - DOMPurifyライブラリを導入
- **JSONP廃止**
  - PromptLibraryDetail.jsをfetch APIに変更
  - Vercelサーバーレス関数（/api/prompts.js）を作成

#### 2. 開発環境整備
- **Vite導入**: vite.config.js作成、ビルド最適化設定
- **ESLint/Prettier**: コード品質とフォーマット設定

#### 3. プロジェクト構造の再編成（進行中）
- 新しいディレクトリ構造を作成
- 一部コンポーネントをsrc/に移動
- CSS構造を整理開始

## 新しいディレクトリ構造

```
/newh-ai-innovation-node/
├── src/                    # ソースコード
│   ├── components/         
│   │   ├── base/          # 基底クラス（未作成）
│   │   ├── common/        # Header.js, Footer.js
│   │   └── sections/      # Hero.js, About.js, Contact.js など
│   ├── styles/            
│   │   ├── base/          # _variables.css, _reset.css, _typography.css
│   │   ├── components/    # _buttons.css（作成中）
│   │   ├── layout/        # _container.css, _grid.css, _section.css
│   │   └── pages/         # ページ固有スタイル（未作成）
│   ├── scripts/           
│   │   └── utils/         # domSafety.js, sanitizer.js, xss-migration-guide.md
│   └── pages/             # HTMLページ（未移動）
├── components/            # 旧コンポーネント（移動中）
├── api/                   # サーバーレス関数
│   ├── ogp.js
│   └── prompts.js
├── assets/                # 静的アセット
├── index.html            # メインページ（パス更新必要）
├── login.html            # ログインページ（パス更新必要）
├── prompt-library.html   # プロンプトライブラリ（パス更新必要）
├── toolbox.html          # ツールボックス（パス更新必要）
├── styles.css            # 旧スタイル（統合予定）
├── mobile-fixes.css      # モバイル修正（統合予定）
├── vite.config.js        # Vite設定
├── package.json          # 依存関係
└── REFACTORING_PLAN.md   # リファクタリング計画
```

## 残りの作業

### 高優先度
1. **HTMLファイルのパス更新**
   - コンポーネントのインポートパスを新しい構造に合わせる
   - CSSのインポートをsrc/styles/main.cssに変更

2. **残りのコンポーネント移動**
   - Services.js, Cases.js, Team.js など
   - ToolboxDetail.js, PromptLibraryDetail.js

### 中優先度
3. **CSS統合完了**
   - 既存のCSSファイルを新構造に移行
   - 重複スタイルの削除
   - CSS変数の一元化

4. **BaseComponent実装**
   - 全コンポーネントの基底クラス作成
   - Shadow DOM採用の準備

5. **残りのXSS修正**
   - 未修正コンポーネントのinnerHTML置換

### 低優先度
6. **ビルドプロセス最適化**
7. **テスト環境構築**
8. **ドキュメント整備**

## 移行時の注意点

1. **パスの変更**
   - 旧: `components/Hero.js`
   - 新: `src/components/sections/Hero.js`

2. **CSS import**
   - 旧: 個別のCSSファイル
   - 新: `src/styles/main.css`（統合ファイル）

3. **開発サーバー**
   - `npm run dev` でVite開発サーバーを起動
   - ホットリロード対応

4. **ビルド**
   - `npm run build` で本番用ビルド
   - distフォルダに出力