# NEWh - AI Innovation Node

生成AIで新規事業開発を革新するウェブサイトプロジェクト。

## プロジェクト概要

このプロジェクトは、NEWh AI Innovation Nodeのウェブサイトです。HTML、CSS、JavaScriptを使用したウェブコンポーネントベースの実装となっています。

## セットアップ手順

1. リポジトリをクローンする
   ```
   git clone [リポジトリURL]
   cd newh-ai-innovation-node
   ```

2. ローカルで実行する
   - ローカルサーバーを起動する場合（例：VS Codeの場合）
     - Live Serverなどの拡張機能を使用
     - または以下のコマンドでシンプルなHTTPサーバーを起動（Pythonがインストールされている場合）
       ```
       # Python 3の場合
       python -m http.server
       
       # Python 2の場合
       python -m SimpleHTTPServer
       ```
   - ブラウザで `http://localhost:8000` にアクセス

## プロジェクト構造

```
newh-ai-innovation-node/
├── index.html          # メインHTMLファイル
├── styles.css          # スタイルシート
├── components/         # Webコンポーネント
│   ├── Header.js       # ヘッダーコンポーネント
│   ├── Hero.js         # ヒーローセクションコンポーネント
│   ├── About.js        # 概要セクションコンポーネント
│   └── ...             # その他のコンポーネント
├── assets/             # 画像やロゴなどの静的アセット
│   ├── images/         # 画像ファイル
│   └── logos/          # ロゴファイル
└── images/             # その他の画像
```

## 技術スタック

- HTML5
- CSS3
- JavaScript (Web Components API)

## 貢献方法

1. このリポジトリをフォークする
2. 機能ブランチを作成する (`git checkout -b feature/amazing-feature`)
3. 変更をコミットする (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュする (`git push origin feature/amazing-feature`)
5. プルリクエストを作成する

## 連絡先

プロジェクトに関するご質問やフィードバックは、[連絡先情報]までお願いします。
