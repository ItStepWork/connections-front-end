
export const i18n = {
  defaultLocale: 'ua',
  locales: ['ua', 'en', 'de', 'fr', 'pl']
} as const

export type Locale = (typeof i18n)['locales'][number]
