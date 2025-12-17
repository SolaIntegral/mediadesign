# かます結びマスター 🎀

一人暮らしを始める大学生向けの、かます結びの結び方をわかりやすく解説するWebサイトです。

## 特徴

- 📱 レスポンシブデザイン（スマートフォン対応）
- 🎨 モダンでポップなデザイン
- 📹 YouTube動画埋め込み対応
- 🎯 図と文字によるわかりやすい説明
- ⚡ Viteによる高速ビルド

## セットアップ

### 必要な環境

- Node.js (v18以上推奨)
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いて確認できます。

### ビルド

```bash
npm run build
```

ビルドされたファイルは `dist` フォルダに生成されます。

## GitHub Pagesで公開する方法

### 1. リポジトリの設定

1. GitHubにリポジトリを作成
2. コードをプッシュ

### 2. GitHub Pagesの設定

1. リポジトリの「Settings」→「Pages」に移動
2. 「Source」で「GitHub Actions」を選択（または「main」ブランチの「/docs」フォルダを選択）
3. または、`dist` フォルダの内容を `docs` フォルダにコピーして、`docs` フォルダを公開する方法もあります

### 3. GitHub Actionsを使う場合（推奨）

`.github/workflows/deploy.yml` ファイルが自動的に作成されます。これにより、コードをプッシュするたびに自動的にビルドとデプロイが行われます。

### 4. 手動でデプロイする場合

```bash
npm run build
```

その後、`dist` フォルダの内容をGitHub Pagesで公開するフォルダ（例：`docs`）にコピーしてコミット・プッシュします。

## カスタマイズ

### 図の追加・変更

`src/steps.ts` ファイルの `getStep1SVG()` などの関数内のSVGコードを編集してください。

### YouTube動画の設定

`src/video.ts` ファイルの `YOUTUBE_VIDEO_ID` に動画IDを設定してください。

例：`https://www.youtube.com/watch?v=ABC123XYZ` の場合、`ABC123XYZ` を設定します。

### デザインの変更

`src/styles/main.css` ファイルを編集してください。カラーパレットは `:root` セクションで定義されています。

## ライセンス

MIT

