
export const i18n = {
  locales: ['ua', 'en', 'de', 'fr', 'pl', 'ru'],
  defaultLocale: 'ua',
} as const

export type Locale = (typeof i18n)['locales'][number]
export type Dict = {[key:string]: string|Dict}
