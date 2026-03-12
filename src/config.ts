export const SITE = {
  name:      '味噌汁市',
  nameEn:    'MISOSIRU CITY',
  url:       'https://misosiru-city.com',
  description: '建築・都市デザインのクリエイティブ集団「味噌汁市」のポートフォリオサイト。住宅、商業施設、公共空間など、まちを作る建築の仕事を紹介します。',
  twitter:   '@Misosiru_City',
  twitterUrl: 'https://x.com/Misosiru_City',
  ogImage:   '/images/og-image.svg',
  themeColor: '#1C1C1A',
} as const;

/** ここを実際のGoogleフォームURLに変更するだけでサイト全体に反映 */
export const CONTACT_FORM_URL = 'https://forms.gle/XXXXXXXXXXXXXXXXX';

export const NAV_LINKS = [
  { href: '/works',         label: 'WORKS',   labelJa: '作品',       external: false },
  { href: '/about',         label: 'ABOUT',   labelJa: '私たちについて', external: false },
  { href: '/news',          label: 'NEWS',    labelJa: 'お知らせ',    external: false },
  { href: '/recruit',       label: 'RECRUIT', labelJa: '採用',        external: false },
  { href: CONTACT_FORM_URL, label: 'CONTACT', labelJa: 'お問い合わせ', external: true  },
] as const;

/** SNS / 外部リンク — hrefを実際のURLに差し替えてください */
export const SNS_LINKS = [
  {
    label: 'X (Twitter)',
    href:  'https://x.com/Misosiru_City',
    icon:  'x',
  },
  {
    label: 'YouTube',
    href:  'https://www.youtube.com/@Misosiru_City', // ← 実際のチャンネルURLに変更
    icon:  'youtube',
  },
  {
    label: 'Discord',
    href:  'https://discord.gg/PNPUDnG4Np',        // ← 招待リンクに変更
    icon:  'discord',
  },
  {
    label: '現コミュHP',
    href:  'https://PLACEHOLDER.com',               // ← 外部HPのURLに変更
    icon:  'external',
  },
] as const;
