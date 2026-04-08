// ============================================================
// コンテンツの「型定義」ファイル
// ============================================================
// このファイルは、各コンテンツファイル（.md）で使える
// フィールドの種類とルールを定義しています。
//
// 通常、このファイルを直接編集する必要はありません。
// 作品やニュースの追加・編集は src/content/ 以下の
// .md ファイルを操作してください。
// ============================================================

import { defineCollection, z } from 'astro:content';

// ------------------------------------------------------------
// 作品（WORKS）の定義
// ------------------------------------------------------------
// src/content/works/*.md で使えるフィールドのルール一覧
const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({

    // 【必須】作品タイトル（日本語）
    title: z.string(),

    // 【任意】作品タイトル（英語）
    titleEn: z.string().optional(),

    // 【必須】一覧・SNSシェア時に表示される短い説明文（80文字以内推奨）
    description: z.string(),

    // 【必須】カテゴリ ← 以下の選択肢から1つを入力してください
    // 選択肢: '住宅' / '商業' / '公共' / '駅・交通' / '自然・公園' / 'インフラ'
    category: z.enum(['住宅', '商業', '公共', '駅・交通', '自然・公園', 'インフラ']),

    // 【必須】ゲーム内のエリア・地区名（例: 味噌汁台1丁目、北口エリア）
    location: z.string(),

    // 【必須】メイン画像のパス（例: /images/works/work-01/main.jpg）
    mainImage: z.string(),

    // 【任意】ギャラリー画像のパス一覧。なければ空欄のままでOK
    galleryImages: z.array(z.string()).default([]),

    // 【必須】トップページの「注目作品」に表示するか？ true / false
    featured: z.boolean().default(false),

    // 【任意】この作品を主に制作したメンバーの名前（表示名）
    creator: z.string().optional(),

    // 【任意】製作者のXアカウント（例: @username）
    //         入力するとXページへのリンクが表示されます
    creatorX: z.string().optional(),

    // 【必須】投稿日（形式: YYYY-MM-DD）一覧の並び順に影響します
    pubDate: z.coerce.date(),

    // 【任意】この作品が属するエリアのスラッグ（例: misosiru-dai, kitaguchi）
    //         src/content/regions/ のファイル名（拡張子なし）と合わせてください
    region: z.string().optional(),

    // 【任意】true にするとサイトに表示されなくなります（下書き）
    draft: z.boolean().default(false),

  }),
});

// ------------------------------------------------------------
// ニュース（NEWS）の定義
// ------------------------------------------------------------
// src/content/news/*.md で使えるフィールドのルール一覧
const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({

    // 【必須】記事タイトル
    title: z.string(),

    // 【必須】一覧・SNSシェア時に表示される短い説明文（100文字以内推奨）
    description: z.string(),

    // 【必須】公開日（形式: YYYY-MM-DD）
    pubDate: z.coerce.date(),

    // 【必須】カテゴリ ← 以下の選択肢から1つを入力してください
    // 選択肢: 'お知らせ' / 'メディア' / 'イベント' / '活動報告'
    category: z.enum(['お知らせ', 'メディア', 'イベント', '活動報告']),

    // 【任意】記事のアイキャッチ画像パス
    image: z.string().optional(),

    // 【任意】true にすると非公開（下書き）になります
    draft: z.boolean().default(false),

  }),
});

// ------------------------------------------------------------
// ページ（PAGES）の定義
// ------------------------------------------------------------
// src/content/pages/*.md で使えるフィールドのルール一覧
// index / about / recruit のテキスト管理用
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({

    // ---- トップページ (index.md) ----
    // 【任意】ヒーローのキャッチコピー（\n で改行）
    heroTitle: z.string().optional(),
    // 【任意】CTAエリアの見出し（\n で改行）
    ctaTitle: z.string().optional(),
    // 【任意】CTAエリアの説明文
    ctaBody: z.string().optional(),

    // ---- ABOUTページ (about.md) ----
    // 【任意】数字で見る実績（{num, label} の組み合わせ）
    stats: z.array(z.object({ num: z.string(), label: z.string() })).optional(),
    // 【任意】コンセプトのリードテキスト（太字の1文）
    conceptLead: z.string().optional(),
    // 【任意】コンセプトの本文（段落ごとに配列で記入）
    conceptBody: z.array(z.string()).optional(),
    // 【任意】活動方針（{en, ja, desc} の組み合わせ）
    policies: z.array(z.object({ en: z.string(), ja: z.string(), desc: z.string() })).optional(),
    // 【任意】メンバー役割一覧（{name, desc} の組み合わせ）
    roles: z.array(z.object({ name: z.string(), desc: z.string() })).optional(),
    // 【任意】メンバーセクション末尾の補足テキスト
    joinNote: z.string().optional(),
    // 【任意】沿革（{date, text} の組み合わせ）
    history: z.array(z.object({ date: z.string(), text: z.string() })).optional(),

    // ---- RECRUITページ (recruit.md) ----
    // 【任意】メッセージセクションの見出し
    messageHeading: z.string().optional(),
    // 【任意】メッセージ本文（段落ごとに配列）
    messageBody: z.array(z.string()).optional(),
    // 【任意】活動スタイルの箇条書き（配列）
    styleItems: z.array(z.string()).optional(),
    // 【任意】CTAエリアの見出し（\n で改行）
    ctaHeading: z.string().optional(),
    // 【任意】CTAエリアの説明文
    ctaBodyRecruit: z.string().optional(),

  }),
});

// ------------------------------------------------------------
// 地域（AREAS）の定義
// ------------------------------------------------------------
// src/content/regions/*.md で使えるフィールドのルール一覧
const regionsCollection = defineCollection({
  type: 'content',
  schema: z.object({

    // 【必須】地域名（日本語）
    title: z.string(),

    // 【任意】地域名（英語）
    titleEn: z.string().optional(),

    // 【必須】地域の説明文（100〜200文字程度）
    description: z.string(),

    // 【任意】エリア全体のメイン画像パス
    areaImage: z.string().optional(),

    // 【必須】一覧での表示順（数字が小さいほど上に表示）
    order: z.number().default(99),

    // 【任意】人口（例: "約13,625人"）
    population: z.string().optional(),

    // 【任意】人口の調査日（例: "2026.3.29"）
    populationDate: z.string().optional(),

    // 【任意】構成する町名（配列で複数入力可）
    towns: z.array(z.string()).default([]),

    // 【任意】駅一覧（name: 駅名、model: 元ネタの実在駅名）
    stations: z.array(z.object({
      name:  z.string(),
      model: z.string().optional(),
    })).default([]),

    // 【任意】区役所・主要施設のMinecraft座標（例: "940 17 -730"）
    officeCoords: z.string().optional(),

    // 【任意】制作状況（例: "制作中"、"完成"）
    status: z.string().optional(),

    // 【任意】風景スライダーの写真一覧
    // src: 画像パス、caption: 写真の説明文（省略可）
    photos: z.array(z.object({
      src:     z.string(),
      caption: z.string().optional(),
    })).default([]),

  }),
});

export const collections = { works: worksCollection, news: newsCollection, pages: pagesCollection, regions: regionsCollection };
