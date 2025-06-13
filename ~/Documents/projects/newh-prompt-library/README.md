# NEWh プロンプトライブラリ

NEWh プロンプトライブラリは、ビジネスや個人的なタスクに最適化されたAIプロンプト集を提供するウェブアプリケーションです。

## 機能

- プロンプトの一覧表示
- カテゴリ別フィルタリング
- 検索機能
- プロンプト詳細表示
- プロンプトのコピー機能
- 認証機能

## 技術スタック

- HTML5
- CSS3
- JavaScript (ES6+)
- Web Components API
- Google Apps Script (バックエンド)

## プロジェクト構造

```
newh-prompt-library/
├── index.html              # メインページ
├── login.html              # ログインページ
├── auth.js                 # 認証スクリプト
├── styles.css              # 基本スタイル
├── prompt-library-styles.css  # プロンプトライブラリ専用スタイル
├── components/             # Webコンポーネント
│   ├── Header.js           # ヘッダーコンポーネント
│   ├── Footer.js           # フッターコンポーネント
│   └── PromptLibraryDetail.js  # プロンプトライブラリコンポーネント
└── README.md               # プロジェクト説明
```

## セットアップ

1. リポジトリをクローンまたはダウンロードします
2. ローカルサーバーでプロジェクトを実行します（例：Live Server）
3. ブラウザで `index.html` にアクセスします
4. ログイン画面が表示されたら、以下の認証情報を使用してログインします：
   - ユーザー名: aiin
   - パスワード: aiin

## データソース

プロンプトデータは以下のGoogle Apps Scriptから取得しています：
`https://script.google.com/macros/s/AKfycbxDe5yTUmo88fCVOBwceOFDHrQACqL6lFdyhEHfddW3Fi8fRuMz6s-IAcn84moYoyy2/exec`

## 使用方法

1. ログイン後、プロンプト一覧が表示されます
2. カテゴリ選択や検索ボックスを使用してプロンプトをフィルタリングできます
3. プロンプトカードをクリックすると詳細が表示されます
4. プロンプト詳細画面では、プロンプトテキストをコピーして使用できます

## ライセンス

Copyright © 2025 NEWh. All rights reserved.
