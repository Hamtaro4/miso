# 味噌汁市 ホームページ 仕様書
# MISOSIRU CITY — Website Specification

> AIプロンプト用仕様書 v1.0
> 作成日: 2026-03-12

---

## 1. プロジェクト概要

### 基本情報
- **サイト名**: 味噌汁市 / MISOSIRU CITY
- **URL**: https://misosiru-city.com（仮）
- **目的**: 建築ポートフォリオ、活動紹介、採用、お知らせ
- **SNS**: https://x.com/Misosiru_City

### サイトコンセプト
建築・都市デザインのクリエイティブ集団「味噌汁市」のポートフォリオサイト。
写真を主役にした、静謐で洗練されたミニマルデザイン。
建築の質と誠実さをウェブデザインでも体現する。

---

## 2. 技術スタック

| カテゴリ | 技術 | バージョン |
|--------|-----|---------|
| フレームワーク | Astro | ^5.x |
| CSSフレームワーク | Tailwind CSS | ^4.x |
| Tailwind統合 | @tailwindcss/vite | ^4.x |
| 型システム | TypeScript | ^5.x |
| 画像最適化 | Astro built-in (Sharp) | - |
| サイトマップ | @astrojs/sitemap | ^3.x |
| コンテンツ管理 | Astro Content Collections | - |

### 選定理由
- **Astro 5**: ゼロJS by default、コンテンツサイト最適、ISR対応
- **Tailwind v4**: @theme変数でデザイントークン管理、高速ビルド
- **Content Collections**: TypeSafe Markdown管理、画像パス管理

---

## 3. ディレクトリ構造

```
/
├── public/
│   ├── images/
│   │   ├── works/           # 作品画像（入れ替え容易）
│   │   │   ├── work-01/
│   │   │   │   ├── main.jpg     ← サムネイル (推奨: 1200×800px)
│   │   │   │   ├── 01.jpg       ← ギャラリー画像
│   │   │   │   └── 02.jpg
│   │   │   └── work-02/...
│   │   ├── news/            # ニュース画像
│   │   ├── hero.jpg         ← トップビジュアル (推奨: 1920×1080px)
│   │   └── og-image.jpg     ← OGP画像 (1200×630px)
│   ├── favicon.svg
│   ├── robots.txt
│   └── _headers             # Netlify セキュリティヘッダー
├── src/
│   ├── content/
│   │   ├── config.ts        ← コンテンツスキーマ定義
│   │   ├── works/           ← 作品 Markdownファイル
│   │   │   ├── work-01.md
│   │   │   └── work-02.md
│   │   └── news/            ← ニュース Markdownファイル
│   │       └── news-01.md
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── WorkCard.astro
│   │   ├── NewsCard.astro
│   │   └── HeroSection.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro  ← SEOメタ、ヘッダー/フッター
│   │   └── WorkLayout.astro  ← 作品詳細ページ用
│   ├── pages/
│   │   ├── index.astro       ← トップ (Hero + 作品 + ニュース)
│   │   ├── works/
│   │   │   ├── index.astro   ← 作品一覧
│   │   │   └── [slug].astro  ← 作品詳細
│   │   ├── news/
│   │   │   ├── index.astro   ← ニュース一覧
│   │   │   └── [slug].astro  ← ニュース詳細
│   │   ├── recruit.astro     ← 制作員募集
│   │   └── 404.astro
│   └── styles/
│       └── global.css        ← Tailwind + カスタム変数
├── astro.config.mjs
├── tailwind.config.ts        ← 不要（v4はCSS変数で管理）
├── tsconfig.json
└── package.json
```

---

## 4. デザイン仕様

### カラーパレット
```css
--color-primary:  #1C1C1A   /* 文字・メインカラー（ほぼ黒） */
--color-surface:  #F8F7F4   /* 背景（温かみのある白） */
--color-accent:   #C9A96E   /* アクセント（味噌色・ゴールド） */
--color-muted:    #6B6B68   /* サブテキスト・キャプション */
--color-border:   #E5E4E0   /* ボーダー・区切り線 */
```

### タイポグラフィ
```css
--font-sans:      "Noto Sans JP", "Inter", ui-sans-serif, system-ui, sans-serif

/* スケール */
--text-display:   clamp(2.5rem, 7vw, 6rem)    /* ヒーロータイトル */
--text-h1:        clamp(1.75rem, 3.5vw, 3rem)  /* ページタイトル */
--text-h2:        clamp(1.125rem, 1.8vw, 1.5rem) /* セクションタイトル */
--text-body:      1rem                          /* 本文 */
--text-small:     0.875rem                      /* キャプション */
```

### スペーシング・レイアウト
- コンテナ最大幅: 1400px（padding: 1.5rem mobile / 3rem desktop）
- ヒーロー高さ: 90vh（desktop）/ 70vh（mobile）
- ワークグリッド: 2列（desktop）/ 1列（mobile）
- ヘッダー高さ: 72px（desktop）/ 60px（mobile）

### アニメーション
- 画像ホバー: `transform: scale(1.03)` + `transition: 0.4s ease`
- カードホバー: subtle shadow elevation
- ページ遷移: Astro View Transitions（`<ClientRouter />`）
- ナビゲーション: fade + slide（モバイルメニュー）

---

## 5. ページ構成

### 5.1 トップページ (`/`)
```
[Header - fixed, blur backdrop]
[Hero Section]
  - フルスクリーン建築写真
  - キャッチコピー: "建築で、まちを作る。"
  - サブ: "MISOSIRU CITY"
  - CTAボタン: "WORKS を見る"
[Featured Works]
  - セクション: "WORKS"
  - featured: true の作品を最大4件グリッド表示
  - "すべての作品を見る →" リンク
[Latest News]
  - セクション: "NEWS"
  - 最新3件を一覧表示
  - "すべてのお知らせを見る →" リンク
[Footer]
```

### 5.2 作品一覧 (`/works`)
```
[Header]
[Page Hero: "WORKS" 見出し + 説明文]
[カテゴリフィルター（オプション）]
[作品グリッド: 全作品]
[Footer]
```

### 5.3 作品詳細 (`/works/[slug]`)
```
[Header]
[フルワイドメイン画像]
[プロジェクト情報]
  - タイトル（大）
  - 年 / カテゴリ / 場所
  - 説明文（Markdownレンダリング）
[ギャラリー: 追加写真グリッド]
[← 前の作品 / 次の作品 →]
[Footer]
```

### 5.4 ニュース一覧 (`/news`)
```
[Header]
[Page Hero: "NEWS"]
[ニュースリスト: 日付 / カテゴリ / タイトル / 冒頭抜粋]
[Footer]
```

### 5.5 ニュース詳細 (`/news/[slug]`)
```
[Header]
[記事タイトル + 日付 + カテゴリ]
[記事本文（Markdown）]
[← 前の記事 / 次の記事 →]
[Footer]
```

### 5.6 制作員募集 (`/recruit`)
```
[Header]
[ページタイトル: "RECRUIT"]
[募集の趣旨・理念テキスト]
[募集ポジション一覧]
  各ポジション:
  - 役職名
  - 業務内容
  - 求める人物像
  - 応募方法（Googleフォームリンク）
[Footer]
```

---

## 6. コンポーネント仕様

### Header.astro
- Props: なし
- スクロール時: 背景透明 → 白 with blur (scroll event)
- デスクトップ: ロゴ左 / ナビゲーション右（WORKS / NEWS / RECRUIT / CONTACT）
- モバイル: ロゴ左 / ハンバーガー右 → フルスクリーンオーバーレイメニュー
- アクティブリンク: 現在ページのリンクに下線表示

### Footer.astro
- ロゴ
- ナビゲーションリンク
- SNS: X (Twitter) アイコンリンク
- コピーライト: `© 2024 味噌汁市`

### WorkCard.astro
```typescript
interface Props {
  slug: string;
  title: string;
  category: string;
  year: number;
  mainImage: string;
  description: string;
}
```
- 画像アスペクト比: 4:3
- ホバー: 画像ズーム + タイトルカラー変化

### HeroSection.astro
```typescript
interface Props {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}
```

---

## 7. コンテンツ管理

### 作品の追加方法
1. `src/content/works/` に Markdown ファイルを追加
2. `public/images/works/[フォルダ名]/` に画像を配置
3. Markdown の frontmatter でパスを指定

```markdown
---
title: "プロジェクト名"
titleEn: "Project Name"
description: "説明文（SEO用）"
category: "住宅" # 住宅 / 商業 / 公共 / 都市計画
year: 2024
location: "東京都"
mainImage: "/images/works/work-01/main.jpg"
galleryImages:
  - "/images/works/work-01/01.jpg"
  - "/images/works/work-01/02.jpg"
featured: true  # トップページに表示する場合
pubDate: 2024-06-01
---

## プロジェクト概要

本文をここに記述...
```

### ニュースの追加方法
`src/content/news/` に Markdown ファイルを追加:

```markdown
---
title: "記事タイトル"
description: "説明文（SEO用）"
pubDate: 2024-06-01
category: "お知らせ" # お知らせ / メディア / イベント
image: "/images/news/news-01.jpg"  # オプション
---

本文...
```

### 画像の差し替え方法
- 同じファイル名で `public/images/` 以下の対応フォルダに上書き
- 推奨フォーマット: JPG または WebP
- 推奨サイズ: メイン画像 1200×800px、ヒーロー 1920×1080px

---

## 8. SEO / AIO 仕様

### メタタグ（全ページ）
```html
<title>{title} | 味噌汁市</title>
<meta name="description" content="{description}">
<meta name="keywords" content="建築,都市デザイン,味噌汁市,ポートフォリオ">
<link rel="canonical" href="{canonicalUrl}">

<!-- OGP -->
<meta property="og:title" content="{title} | 味噌汁市">
<meta property="og:description" content="{description}">
<meta property="og:image" content="{ogImage}">
<meta property="og:url" content="{url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="ja_JP">
<meta property="og:site_name" content="味噌汁市">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@Misosiru_City">
```

### 構造化データ（JSON-LD）
- **Organization**: サイト全体
- **BreadcrumbList**: 全ページ
- **CreativeWork**: 各作品ページ
- **Article**: 各ニュースページ

### サイトマップ
- `@astrojs/sitemap` により自動生成（`/sitemap-index.xml`）

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://misosiru-city.com/sitemap-index.xml

# AI クローラー許可（AIOに対応）
User-agent: GPTBot
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: PerplexityBot
Allow: /
```

---

## 9. セキュリティ仕様

### HTTPセキュリティヘッダー（`public/_headers`）
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://docs.google.com
```

### セキュリティ原則
- 静的サイト（サーバーサイドコードなし）→ 攻撃面が最小
- 外部スクリプトは Google Fonts のみ（CDN 経由）
- 問い合わせはGoogleフォーム外部リンク（自サイトにフォームなし）
- 依存パッケージの定期アップデート必須

---

## 10. パフォーマンス目標

| 指標 | 目標値 |
|-----|-------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID/INP | < 200ms |

### 最適化施策
- Astro の自動画像最適化（WebP変換、サイズ最適化）
- フォントは `font-display: swap`
- ヒーロー画像を `<link rel="preload">` で先読み
- JS は最小限（モバイルメニューのみ）
- CSSは Tailwind purge で最小化

---

## 11. デプロイ

### 推奨ホスティング: Netlify または Vercel
```bash
# ビルドコマンド
npm run build

# 出力ディレクトリ
dist/
```

### 環境変数（必要な場合）
```
PUBLIC_SITE_URL=https://misosiru-city.com
PUBLIC_CONTACT_FORM_URL=https://forms.gle/xxxxxxxxxxxx  # GoogleフォームURL
```

---

## 12. Googleフォーム設定

以下のページからGoogleフォームへリンクを設置:
- ナビゲーション: "CONTACT" リンク
- 募集ページ: 各ポジションの応募ボタン
- フッター: お問い合わせリンク

フォームURLは環境変数 `PUBLIC_CONTACT_FORM_URL` で一元管理。

---

*このドキュメントはAIによるサイト生成の仕様書として機能します。*
*各セクションの仕様に従い、コードを生成してください。*
