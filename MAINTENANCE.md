# 味噌汁市 HP 運用・保守マニュアル

> 最終更新: 2026-04

---

## 目次

1. [サイト構成の全体像](#1-サイト構成の全体像)
2. [日常の更新作業](#2-日常の更新作業)
   - [作品を追加・編集する](#21-作品を追加編集する)
   - [ニュースを追加・編集する](#22-ニュースを追加編集する)
   - [エリア（地域）ページを追加・編集する](#23-エリア地域ページを追加編集する)
   - [YouTube動画を追加・変更する](#24-youtube動画を追加変更する)
   - [SNS・外部リンクを変更する](#25-sns外部リンクを変更する)
   - [お問い合わせフォームURLを変更する](#26-お問い合わせフォームurlを変更する)
   - [Discordリンクを変更する](#27-discordリンクを変更する)
3. [ページ本文の編集](#3-ページ本文の編集)
   - [トップページ](#31-トップページ)
   - [RECRUITページ](#32-recruitページ)
   - [ABOUTページ](#33-aboutページ)
4. [画像の追加・差し替え](#4-画像の追加差し替え)
   - [作品画像](#41-作品画像)
   - [エリアページの画像](#42-エリアページの画像)
   - [トップのヒーロー画像](#43-トップのヒーロー画像)
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
│   │   ├── regions/           ← エリアページ（sumiyoshi.md, kitaguchi.md ...）★新機能
│   │   └── pages/             ← 各ページの文章（index.md, recruit.md, about.md）
│   └── pages/
│       ├── index.astro        ← トップページのレイアウト
│       ├── about.astro        ← ABOUTページのレイアウト
│       ├── recruit.astro      ← RECRUITページのレイアウト
│       └── areas/             ← エリア一覧・詳細ページのレイアウト ★新機能
└── public/
    └── images/
        ├── hero.jpg           ← トップのヒーロー画像
        ├── works/
        │   ├── work-01/       ← 作品01の画像フォルダ
        │   └── work-02/       ← 作品02の画像フォルダ
        └── areas/             ← エリアページの画像フォルダ ★新機能
            ├── sumiyoshi/     ← 住吉区の画像
            └── kitaguchi/     ← 北口エリアの画像
```

**基本ルール：**
- `.md` ファイルを編集 → 作品・ニュース・エリアのページが変わる
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
region: "sumiyoshi"        # ★ エリアページに表示する場合はエリアのスラッグを入れる
draft: false
---

## 作品の説明
本文をここに書く。
```

**エリアページに作品を紐付けるには**
→ `region:` にエリアのスラッグ（ファイル名の `.md` を除いた部分）を入れてください。

| region の値 | 表示されるエリアページ |
|------------|---------------------|
| `sumiyoshi` | 住吉区 |
| `kitaguchi` | 北口エリア |
| `misosiru-dai` | 味噌汁台エリア |
| `misogawa` | みそ川南エリア |

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

### 2.3 エリア（地域）ページを追加・編集する

エリアページは `src/content/regions/` の `.md` ファイルで管理します。
ナビゲーション（ハンバーガーメニュー・デスクトップ）の **AREAS** からアクセスできます。

#### 既存エリアの情報を編集する

例: `src/content/regions/sumiyoshi.md` を開いて書き換えます。

**変更できる主な項目：**

```yaml
title: "住吉区"                     # エリア名（日本語）
titleEn: "Sumiyoshi Ward"           # エリア名（英語）
description: "エリアの説明文..."     # 一覧と詳細ページの上部に表示
areaImage: "/images/areas/sumiyoshi/main.jpg"  # ページ最上部の大きな画像
order: 1                            # 一覧での並び順（小さいほど上）
population: "約13,625人"            # 人口
populationDate: "2026.3.29"         # 人口の調査日
towns:                              # 構成する町名
  - 住吉
  - 南住吉
stations:                           # 駅一覧
  - name: "地下鉄住吉駅"
    model: "あびこ駅"               # 元ネタの実在駅名
officeCoords: "940 17 -730"         # 区役所のMinecraft座標
status: "制作中"                    # 制作状況
```

#### 新しいエリアを追加する

1. `src/content/regions/sumiyoshi.md` をコピーして新しいファイル名（例: `kita.md`）にリネーム
2. 中身を新しいエリアの内容に書き換える
3. 必要な作品の `.md` に `region: "kita"` を追加する（ファイル名と一致させること）

#### エリアページに写真を載せる

エリアページの本文（`---` より下の部分）に markdown の画像構文で書くと、
**文章の間のどこにでも**写真を挿入できます。

```markdown
## 東部（南住吉地区）

ここに文章を書く。

![住吉公園の様子](/images/areas/sumiyoshi/park.jpg)
*住吉公園 — 野球グラウンドや遊具を備えた市内最大の公園*

## 南部（矢田地区）
```

- `[]` の中 → 画像の説明文（アクセシビリティ用）
- `()` の中 → 画像ファイルのパス（`public/` フォルダからの相対パス）
- `*キャプション*` → 写真の下に小さく表示されるキャプション（省略可）

画像ファイルは `public/images/areas/エリア名/` に入れてください。

---

### 2.4 YouTube動画を追加・変更する

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

### 2.5 SNS・外部リンクを変更する

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

### 2.6 お問い合わせフォームURLを変更する

`src/config.ts` の `CONTACT_FORM_URL` を変更します。

```typescript
export const CONTACT_FORM_URL = 'https://forms.gle/XXXXXXXXXXXXXXXXX';
//                                       ↑ ここをGoogleフォームのURLに変更
```

ナビゲーション・フッター・リクルートページのボタン、全てに自動で反映されます。

---

### 2.7 Discordリンクを変更する

`SNS_LINKS` の `discord` エントリの `href` を変えるだけです。
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
- `ctaHeading` — CTAの見出し

---

### 3.3 ABOUTページ

`src/pages/about.astro` を直接編集します。
テキストのみの変更であれば `<h2>` `<p>` タグの中身だけ書き換えてください。
タグ（`<div>`, `<section>` など）は消さないよう注意してください。

---

## 4. 画像の追加・差し替え

### 4.1 作品画像

**一覧・エリアページのサムネイル（mainImage）**
```
public/images/works/work-01/
  └── main.jpg     ← 一覧・トップ・エリアページのサムネイルに使われる
```
→ `.md` の `mainImage: "/images/works/work-01/main.jpg"` のパスと一致させてください。
→ 推奨サイズ: **1280×720px**（16:9）

**詳細ページのギャラリー（galleryImages）**
```
public/images/works/work-01/
  ├── 01.jpg       ← 詳細ページのギャラリー1枚目
  ├── 02.jpg       ← 詳細ページのギャラリー2枚目
  └── 03.jpg       ← 詳細ページのギャラリー3枚目
```
→ `.md` の `galleryImages` に列挙したパスと一致させてください。

**エリアページ「このエリアの建物」への表示**

エリアページの「このエリアの建物」セクションには、
そのエリアに紐付いた作品の `mainImage` が自動的に表示されます。

```
表示するには:
① public/images/works/work-XX/main.jpg に画像を置く
② work-XX.md の mainImage パスを正しく設定する
③ work-XX.md に region: "エリアのスラッグ" を追加する
```

---

### 4.2 エリアページの画像

**ページ上部のヒーロー画像（areaImage）**
```
public/images/areas/sumiyoshi/
  └── main.jpg     ← ページ最上部に大きく表示される
```
→ エリアの `.md` で `areaImage: "/images/areas/sumiyoshi/main.jpg"` と指定してください。
→ 推奨サイズ: **1920×820px** 以上（横長）

**本文中の写真**

エリアページの `.md` 本文に以下の形式で書くと、文章の間に写真を挿入できます。

```markdown
文章の後ろにこれを書く:

![写真の説明](/images/areas/sumiyoshi/park.jpg)
*写真の下に表示するキャプション（省略可）*
```

→ 画像ファイルは `public/images/areas/エリア名/` に入れてください。
→ 推奨サイズ: **1280×720px**（16:9）

---

### 4.3 トップのヒーロー画像

`public/images/hero.jpg` を上書きするだけです。
推奨サイズ: **1920×1080px** 以上、JPG形式

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
git commit -m "住吉区に写真を追加"
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
# http://localhost:4321/miso/ にアクセス
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
- 該当の `public/images/...` フォルダにファイルが存在するか確認
- `.md` の `mainImage` や `areaImage` のパスと**ファイル名が完全一致**しているか確認
  - スペルミスに注意（`Park.jpg` ≠ `park.jpg`）
  - 大文字小文字を区別します

### ❓ エリアページに作品が表示されない
- 作品の `.md` に `region: "エリアのスラッグ"` が正しく入っているか確認
- スラッグは `src/content/regions/` のファイル名（`.md` を除いた部分）と一致させること
  - 例: `regions/sumiyoshi.md` → `region: "sumiyoshi"`

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
| エリアページを追加・編集 | `src/content/regions/エリア名.md` |
| エリアに作品を紐付ける | 作品 `.md` の `region:` フィールド |
| エリアページに写真を追加 | エリア `.md` 本文に `![alt](パス)` を記述 |
| トップページの文章変更 | `src/content/pages/index.md` |
| リクルートの文章変更 | `src/content/pages/recruit.md` |
| ABOUTページの文章変更 | `src/pages/about.astro` |
| YouTube動画の変更 | `src/config.ts` → `YOUTUBE_VIDEOS` |
| SNSリンクの変更 | `src/config.ts` → `SNS_LINKS` |
| Discord招待リンクの変更 | `src/config.ts` → `SNS_LINKS` の discord |
| お問い合わせフォームURL | `src/config.ts` → `CONTACT_FORM_URL` |
| ヒーロー画像の差し替え | `public/images/hero.jpg` を上書き |
| 作品画像の差し替え | `public/images/works/work-XX/` フォルダ |
| エリアページのヒーロー画像 | `public/images/areas/エリア名/` フォルダ |
| OGP画像の差し替え | `public/images/og-image.svg` を上書き |
