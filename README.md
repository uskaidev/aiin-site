# NEWh - AI Innovation Node

生成AIで新規事業開発を革新するWebサイトプロジェクト。モダンなWeb技術とセキュリティベストプラクティスを採用した高品質なウェブアプリケーションです。

## プロジェクト概要

NEWh AI Innovation Nodeは、生成AIによる新規事業開発の革新を目指すプラットフォームのWebサイトです。セキュアで高性能、メンテナンス性の高いアーキテクチャを採用しています。

### 特徴

- **🔒 セキュリティ重視**: XSS脆弱性対策、CSP、セキュアなDOM操作
- **⚡ 高性能**: 画像遅延読み込み、コード分割、最適化されたバンドル
- **🧩 モジュラー設計**: Web Components、再利用可能なコンポーネント
- **🎨 レスポンシブ**: モバイルファースト、アクセシブルなデザイン
- **🛠️ 開発者体験**: TypeScript、ESLint、Prettier、Vitest

## セットアップ手順

### 必要な環境

- Node.js 14.0.0 以上
- npm または yarn

### インストールと起動

1. **リポジトリをクローン**
   ```bash
   git clone [リポジトリURL]
   cd newh-ai-innovation-node
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **開発サーバーを起動**
   ```bash
   npm run dev
   ```
   ブラウザで `http://localhost:3000` にアクセス

### その他のコマンド

```bash
# 本番環境用ビルド
npm run build

# プレビューサーバー
npm run preview

# リンター実行
npm run lint

# フォーマッター実行
npm run format

# テスト実行
npm run test

# テストUI
npm run test:ui

# カバレッジ付きテスト
npm run test:coverage

# Vercelデプロイ
npm run deploy
```

## プロジェクト構造

```
newh-ai-innovation-node/
├── index.html                    # メインHTMLファイル
├── login.html                    # ログインページ
├── prompt-library.html           # プロンプトライブラリページ
├── toolbox.html                  # ツールボックスページ
├── auth.js                       # 認証システム
├── vite.config.js                # Vite設定
├── vitest.config.js              # Vitest設定
├── package.json                  # プロジェクト設定
├── src/                          # ソースコード
│   ├── components/               # Webコンポーネント
│   │   ├── base/                 # ベースコンポーネント
│   │   │   └── BaseComponent.js  # ベースクラス（Shadow DOM対応）
│   │   ├── common/               # 共通コンポーネント
│   │   │   ├── Header.js         # ヘッダーコンポーネント
│   │   │   ├── Header-v2.js      # Shadow DOM版ヘッダー
│   │   │   ├── Footer.js         # フッターコンポーネント
│   │   │   └── Footer-v2.js      # Shadow DOM版フッター
│   │   └── sections/             # セクションコンポーネント
│   │       ├── Hero.js           # ヒーローセクション
│   │       ├── Hero-v2.js        # Shadow DOM版ヒーロー
│   │       ├── About.js          # 概要セクション
│   │       ├── About-v2.js       # Shadow DOM版概要
│   │       ├── Solutions.js      # ソリューションセクション
│   │       ├── Solutions-v2.js   # Shadow DOM版ソリューション
│   │       ├── Cases.js          # 事例セクション
│   │       ├── Cases-v2.js       # Shadow DOM版事例
│   │       ├── Team.js           # チームセクション
│   │       ├── Team-v2.js        # Shadow DOM版チーム
│   │       ├── Insight.js        # インサイトセクション
│   │       ├── Insight-v2.js     # Shadow DOM版インサイト
│   │       ├── Contact.js        # お問い合わせセクション
│   │       ├── Contact-v2.js     # Shadow DOM版お問い合わせ
│   │       └── Toolbox.js        # ツールボックスセクション
│   ├── styles/                   # スタイルシート
│   │   ├── main.css              # メインCSSエントリーポイント
│   │   ├── base/                 # ベーススタイル
│   │   │   ├── _variables.css    # CSS変数
│   │   │   ├── _reset.css        # リセットCSS
│   │   │   └── _typography.css   # タイポグラフィ
│   │   ├── components/           # コンポーネントスタイル
│   │   │   ├── lazyload.css      # 遅延読み込みスタイル
│   │   │   └── ...               # その他コンポーネントスタイル
│   │   ├── layout/               # レイアウトスタイル
│   │   ├── pages/                # ページ固有スタイル
│   │   └── utilities/            # ユーティリティクラス
│   └── utils/                    # ユーティリティ
│       └── lazyload.js           # 画像遅延読み込み
├── tests/                        # テストファイル
│   ├── setup.js                  # テストセットアップ
│   ├── components/               # コンポーネントテスト
│   │   └── BaseComponent.test.js # BaseComponentテスト
│   └── utils/                    # ユーティリティテスト
│       └── lazyload.test.js      # 遅延読み込みテスト
├── public/                       # 静的アセット（Viteビルド時生成）
│   └── assets/                   # 最適化済み画像・ロゴ
├── dist/                         # ビルド出力（本番用）
├── api/                          # Vercel Serverless Functions
│   └── prompt-library.js         # プロンプトライブラリAPI
└── .gitignore                    # Git除外設定
```

## 技術スタック

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: モダンCSS、Grid、Flexbox、カスタムプロパティ
- **JavaScript (ES6+)**: モジュールシステム、Web Components API
- **Web Components**: カスタム要素、Shadow DOM
- **Vite**: 高速開発サーバー、モジュールバンドラー

### 開発ツール
- **ESLint**: コード品質チェック
- **Prettier**: コードフォーマッター
- **Vitest**: 高速テストランナー
- **JSDOM**: DOM環境テスト

### インフラ・デプロイ
- **Vercel**: ホスティング、Serverless Functions
- **Git**: バージョン管理

## 開発ガイドライン

### コードスタイル

1. **JavaScript**
   - ES6+ モジュールシステムを使用
   - Web Components APIによるコンポーネント化
   - XSS対策のため`innerHTML`は使用せず、DOM操作メソッドを使用

2. **CSS**
   - BEM命名規則
   - CSS Grid / Flexboxによるレスポンシブレイアウト
   - CSS変数による一貫したデザインシステム

3. **セキュリティ**
   - Content Security Policy (CSP) の適用
   - XSS脆弱性対策（DOM操作の安全化）
   - 入力値のサニタイゼーション

### コンポーネント開発

1. **BaseComponent継承**
   ```javascript
   class MyComponent extends BaseComponent {
     render() {
       // Shadow DOMを使用した安全なDOM構築
     }
     
     setupEventListeners() {
       // イベントリスナーの設定（自動クリーンアップ付き）
     }
     
     getStyles() {
       // コンポーネント固有のスタイル
     }
   }
   ```

2. **テスト作成**
   - Vitestを使用したユニットテスト
   - コンポーネントの動作確認
   - カバレッジ90%以上を目標

### パフォーマンス最適化

- **画像遅延読み込み**: Intersection Observer API使用
- **コード分割**: Viteによる自動分割
- **バンドル最適化**: Tree shaking、圧縮
- **キャッシュ戦略**: 適切なHTTPヘッダー設定

## API仕様

### プロンプトライブラリAPI

**エンドポイント**: `/api/prompt-library`

**パラメータ**:
- `action`: 実行するアクション（list, get, create, update, delete）
- `id`: プロンプトID（get, update, deleteで必要）
- `title`: プロンプトタイトル（create, updateで必要）
- `content`: プロンプト内容（create, updateで必要）
- `category`: カテゴリー（create, updateで必要）

**レスポンス例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "事業計画作成",
      "content": "新規事業の計画を作成してください...",
      "category": "business",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

## 貢献方法

1. **Issue作成**: バグ報告や機能提案
2. **フォーク**: このリポジトリをフォーク
3. **ブランチ作成**: `git checkout -b feature/amazing-feature`
4. **開発**: 機能実装・テスト作成
5. **コミット**: `git commit -m 'Add some amazing feature'`
6. **プッシュ**: `git push origin feature/amazing-feature`
7. **プルリクエスト**: レビュー依頼

### コミットメッセージ規約

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル修正
refactor: リファクタリング
test: テスト追加・修正
chore: ビルド・設定変更
```

## ライセンス

このプロジェクトは NEWh Inc. の所有物です。

## 連絡先

- **Email**: customer@newh.co.jp
- **Address**: 〒100-0004 東京都千代田区大手町1-6-1
- **Website**: [https://newh.co.jp](https://newh.co.jp)

## 更新履歴

### v1.0.0 (2024-01-15)
- 初期リリース
- Web Componentsベースの実装
- セキュリティ強化（XSS対策）
- 画像遅延読み込み実装
- テストエンジン導入（Vitest）
- Shadow DOM対応コンポーネント作成