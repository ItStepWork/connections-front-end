
export const i18n = {
  locales: ['ua', 'en', 'de', 'fr', 'pl'],
  defaultLocale: 'ua',
} as const

export type Locale = (typeof i18n)['locales'][number]
