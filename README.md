# 味噌汁市 ホームページ

建築ポートフォリオ & 情報発信サイト

## セットアップ

```bash
npm install
npm run dev    # 開発サーバー起動 (http://localhost:4321)
npm run build  # 本番ビルド
npm run preview # ビルド結果のプレビュー
```

## コンテンツの更新方法

### 作品を追加する

1. `src/content/works/` に Markdown ファイルを作成
2. `public/images/works/[フォルダ名]/` に画像を配置

```markdown
---
title: "プロジェクト名"
titleEn: "Project Name"
description: "SEO用の説明文（120文字程度）"
category: "住宅"  # 住宅 / 商業 / 公共 / 都市計画 / リノベーション / インスタレーション
year: 2024
location: "東京都〇〇区"
mainImage: "/images/works/work-XX/main.jpg"
galleryImages:
  - "/images/works/work-XX/01.jpg"
  - "/images/works/work-XX/02.jpg"
featured: true  # トップページに表示する場合
client: "クライアント名"
area: "100㎡"
pubDate: 2024-06-01
---

## プロジェクト概要

本文をここに...
```

### 画像の推奨サイズ

| 用途 | サイズ | 形式 |
|-----|-------|-----|
| 作品メイン | 1200 × 800px | JPG / WebP |
| 作品ギャラリー | 1200 × 900px | JPG / WebP |
| ヒーロー画像 | 1920 × 1080px | JPG / WebP |
| OGP画像 | 1200 × 630px | JPG |

### ニュースを追加する

`src/content/news/` に Markdown ファイルを作成:

```markdown
---
title: "記事タイトル"
description: "SEO用の説明文"
pubDate: 2024-06-01
category: "お知らせ"  # お知らせ / メディア / イベント / 活動報告
image: "/images/news/news-XX.jpg"  # オプション
---

本文...
```

### GoogleフォームURLを変更する

以下のファイルの `https://forms.gle/XXXXXXXXXXXXXXXXX` を実際のURLに置き換える:

- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/pages/recruit.astro`
- `src/pages/index.astro`

### トップのヒーロー画像を変更する

`public/images/hero.jpg` を差し替える（推奨: 1920×1080px）

## デプロイ

### Netlify（推奨）

```
Build command: npm run build
Publish directory: dist
```

### Vercel

```
Build command: npm run build
Output directory: dist
```

## 技術スタック

- **Astro 5** — 静的サイト生成
- **Tailwind CSS v4** — スタイリング
- **TypeScript** — 型安全
- **Astro Content Collections** — コンテンツ管理
