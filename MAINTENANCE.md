# 味噌汁市 HP 運用・保守マニュアル

> 最終更新: 2026-03

---

## 目次

1. [サイト構成の全体像](#1-サイト構成の全体像)
2. [日常の更新作業](#2-日常の更新作業)
   - [作品を追加・編集する](#21-作品を追加編集する)
   - [ニュースを追加・編集する](#22-ニュースを追加編集する)
   - [YouTube動画を追加・変更する](#23-youtube動画を追加変更する)
   - [SNS・外部リンクを変更する](#24-sns外部リンクを変更する)
   - [お問い合わせフォームURLを変更する](#25-お問い合わせフォームurlを変更する)
   - [Discordリンクを変更する](#26-discordリンクを変更する)
3. [ページ本文の編集](#3-ページ本文の編集)
   - [トップページ](#31-トップページ)
   - [RECRUITページ](#32-recruitページ)
   - [ABOUTページ](#33-aboutページ)
4. [画像の差し替え](#4-画像の差し替え)
5. [GitHubへの反映（デプロイ）](#5-githubへの反映デプロイ)
6. [ローカルでプレビューする](#6-ローカルでプレビューする)
7. [トラブル対応](#7-トラブル対応)
8. [ファイル構成マップ](#8-ファイル構成マップ)

---

## 1. サイト構成の全体像

```
misoHP3/
├── src/
│   ├── config.ts              ← SNSリンク・YouTube動画・連絡先など「設定の一元管理」
│   ├── content/
│   │   ├── works/             ← 作品ページ（work-01.md, work-02.md ...）
│   │   ├── news/              ← ニュース記事（news-01.md, news-02.md ...）
│   │   └── pages/             ← 各ページの文章（index.md, recruit.md, about.md）
│   └── pages/
│       ├── index.astro        ← トップページのレイアウト
│       ├── about.astro        ← ABOUTページのレイアウト
│       └── recruit.astro      ← RECRUITページのレイアウト
└── public/
    └── images/
        ├── hero.jpg           ← トップのヒーロー画像
        └── works/
            ├── work-01/       ← 作品01の画像フォルダ
            └── work-02/       ← 作品02の画像フォルダ
```

**基本ルール：**
- `.md` ファイルを編集 → 作品・ニュースのページが変わる
- `config.ts` を編集 → SNSリンク・YouTube・フォームURLなどが一括で変わる
- `public/images/` に画像を置く → サイトに画像が表示される
- 編集後 GitHub に push すると自動でサイトに反映される

---

## 2. 日常の更新作業

### 2.1 作品を追加・編集する

**既存作品を編集する場合**

`src/content/works/work-01.md` を開いてテキストを書き換えるだけです。

**新しい作品を追加する場合**

1. `src/content/works/work-01.md` をコピーして `work-05.md`（連番）にリネーム
2. ファイルの中身を新しい作品の内容に書き換える
3. `public/images/works/work-05/` フォルダを作って画像を入れる

```yaml
# work-05.md の書き方例
---
title: "新しい作品名"
titleEn: "New Work Name"
description: "説明文（80文字以内）"
category: "住宅"           # 住宅 / 商業 / 公共 / 駅・交通 / 自然・公園 / インフラ
location: "エリア名"
mainImage: "/images/works/work-05/main.jpg"
galleryImages:
  - "/images/works/work-05/01.jpg"
  - "/images/works/work-05/02.jpg"
featured: true             # トップページに表示する場合は true
creator: "担当者名"
creatorX: "@x_handle"      # なければ削除してOK
pubDate: 2024-06-01
draft: false
---

## 作品の説明
本文をここに書く。
```

**トップページの注目作品に表示したい場合**
→ `featured: true` にする（上限4件）

**下書き（非公開）にしたい場合**
→ `draft: true` にする

---

### 2.2 ニュースを追加・編集する

`src/content/news/news-01.md` をコピーして連番ファイルを作るだけです。

```yaml
# news-04.md の書き方例
---
title: "お知らせタイトル"
description: "一覧に表示される短い説明"
category: "お知らせ"        # お知らせ / メディア / 活動報告 / イベント
pubDate: 2024-10-01
draft: false
---

## 本文
ここに詳細を書く。
```

---

### 2.3 YouTube動画を追加・変更する

`src/config.ts` の `YOUTUBE_VIDEOS` を編集します。

**動画IDの確認方法**
```
YouTubeのURL: https://www.youtube.com/watch?v=XXXXXXXXXXX
                                              ↑ここがID
短縮URL:       https://youtu.be/XXXXXXXXXXX
                                ↑ここがID
```

**config.ts の編集例**
```typescript
export const YOUTUBE_VIDEOS = [
  {
    id: 'XXXXXXXXXXX',      // ← ここにIDを貼る
    title: '動画タイトル',
    featured: true,         // true にするとトップに大きく表示（1つだけ）
  },
  {
    id: 'YYYYYYYYYYY',
    title: '別の動画',
    featured: false,
  },
  // 動画を追加するときはここにコピーして貼り付ける
];
```

**注意：** `featured: true` は必ず1つだけにしてください。

---

### 2.4 SNS・外部リンクを変更する

`src/config.ts` の `SNS_LINKS` を編集します。

```typescript
export const SNS_LINKS = [
  { label: 'X (Twitter)', href: 'https://x.com/Misosiru_City',           icon: 'x'        },
  { label: 'YouTube',     href: 'https://www.youtube.com/@MisosiruCity', icon: 'youtube'  },
  { label: 'Discord',     href: 'https://discord.gg/招待コード',          icon: 'discord'  },
  { label: '現コミュHP',  href: 'https://your-site.com',                 icon: 'external' },
];
```

`href: '...'` の部分だけ変更すればOKです。
フッターとリクルートページの両方に自動で反映されます。

---

### 2.5 お問い合わせフォームURLを変更する

`src/config.ts` の `CONTACT_FORM_URL` を変更します。

```typescript
export const CONTACT_FORM_URL = 'https://forms.gle/XXXXXXXXXXXXXXXXX';
//                                       ↑ ここをGoogleフォームのURLに変更
```

ナビゲーション・フッター・リクルートページのボタン、全てに自動で反映されます。

---

### 2.6 Discordリンクを変更する

上の `SNS_LINKS` の `discord` エントリの `href` を変えるだけです。
フッターとリクルートページの「Discord で話しかける」ボタン両方に反映されます。

```typescript
{ label: 'Discord', href: 'https://discord.gg/新しい招待コード', icon: 'discord' },
```

---

## 3. ページ本文の編集

### 3.1 トップページ

`src/content/pages/index.md` を編集します。

変更できる項目：
- `heroTitle` — ヒーローの大見出し
- `ctaTitle` — 下部CTAの見出し
- `ctaBody` — 下部CTAの本文

---

### 3.2 RECRUITページ

`src/content/pages/recruit.md` を編集します。

変更できる項目：
- `messageHeading` — メインの見出し
- `messageBody` — 本文（配列で複数段落）
- `styleItems` — 活動スタイルの箇条書き
- `isRecruiting` — `true` で「募集中」バナーを表示
- `ctaHeading` — CTAの見出し

---

### 3.3 ABOUTページ

`src/pages/about.astro` を直接編集します。
テキストのみの変更であれば `<h2>` `<p>` タグの中身だけ書き換えてください。
タグ（`<div>`, `<section>` など）は消さないよう注意してください。

---

## 4. 画像の差し替え

### トップのヒーロー画像
`public/images/hero.jpg` を上書きするだけです。
推奨サイズ: **1920×1080px** 以上、JPG形式

### 作品画像
```
public/images/works/work-01/
  ├── main.jpg     ← 一覧・トップに表示されるメイン画像（推奨: 800×600px）
  ├── 01.jpg       ← 詳細ページのギャラリー1枚目
  └── 02.jpg       ← 詳細ページのギャラリー2枚目
```
`.md` ファイルの `mainImage` / `galleryImages` のパスと一致させてください。

### OGP画像（SNSシェア時のサムネイル）
`public/images/og-image.svg` を差し替えます。
推奨サイズ: **1200×630px**

---

## 5. GitHubへの反映（デプロイ）

ファイルを編集したら、以下の手順でサイトに反映させます。

```bash
# ① misoHP3フォルダに移動
cd ~/Desktop/misoHP3

# ② 変更をGitHubに保存・送信（コメントは変更内容を簡単に書く）
git add .
git commit -m "作品 work-05 を追加"
git push origin main
```

push後、**約1〜3分**でサイトに反映されます。

**反映状況の確認：**
https://github.com/Hamtaro4/miso/actions
→ ✅ 緑チェックがつけば反映完了

**公開URL：**
https://hamtaro4.github.io/miso/

---

## 6. ローカルでプレビューする

GitHubに上げる前に手元で確認したい場合：

```bash
# ① ターミナルでmisoHP3フォルダに移動
cd ~/Desktop/misoHP3

# ② 開発サーバーを起動
npm run dev

# ③ ブラウザで開く
# http://localhost:4321 にアクセス
```

ファイルを保存するたびにブラウザが**自動更新**されます。
確認が終わったらターミナルで `Ctrl + C` で停止。

---

## 7. トラブル対応

### ❓ サイトが更新されない
1. https://github.com/Hamtaro4/miso/actions を開く
2. 最新のワークフローが ✅ 緑か確認
3. ❌ 赤い場合 → クリックしてエラーを確認し、ファイルの書き方に問題がないか確認

### ❓ 画像が表示されない
- `public/images/works/work-XX/main.jpg` が存在するか確認
- `.md` の `mainImage` のパスと一致しているか確認（スペルミスに注意）
- ファイル名の大文字小文字が一致しているか確認（`Main.jpg` ≠ `main.jpg`）

### ❓ 作品や記事が表示されない
- `.md` ファイルの `draft: false` になっているか確認
- `pubDate` の日付フォーマットが `2024-06-01` 形式か確認
- `category` がスキーマで定義された選択肢と一致しているか確認

### ❓ ローカルで動かない（npm run dev がエラー）
```bash
# node_modulesを入れ直す
cd ~/Desktop/misoHP3
npm install
npm run dev
```

### ❓ ビルドエラーが出る
```bash
npm run build
```
でエラーが出た場合、エラーメッセージの「行番号」を確認してファイルを修正してください。

---

## 8. ファイル構成マップ

| やりたいこと | 編集するファイル |
|-------------|----------------|
| 作品を追加・編集 | `src/content/works/work-XX.md` |
| ニュースを追加・編集 | `src/content/news/news-XX.md` |
| トップページの文章変更 | `src/content/pages/index.md` |
| リクルートの文章変更 | `src/content/pages/recruit.md` |
| ABOUTページの文章変更 | `src/pages/about.astro` |
| YouTube動画の変更 | `src/config.ts` → `YOUTUBE_VIDEOS` |
| SNSリンクの変更 | `src/config.ts` → `SNS_LINKS` |
| Discord招待リンクの変更 | `src/config.ts` → `SNS_LINKS` の discord |
| お問い合わせフォームURL | `src/config.ts` → `CONTACT_FORM_URL` |
| ヒーロー画像の差し替え | `public/images/hero.jpg` を上書き |
| 作品画像の差し替え | `public/images/works/work-XX/` フォルダ |
| OGP画像の差し替え | `public/images/og-image.svg` を上書き |
