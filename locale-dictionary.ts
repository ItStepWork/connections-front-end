import 'server-only'
import { Locale, i18n } from './i18n.config';

const dictionaries = {
  ua: () => import('./dictionaries/ua.json').then(module => module.default),
  en: () => import('./dictionaries/en.json').then(module => module.default),
  de: () => import('./dictionaries/de.json').then(module => module.default),
  fr: () => import('./dictionaries/fr.json').then(module => module.default),
  pl: () => import('./dictionaries/pl.json').then(module => module.default),

}

export const getDictionary = async (locale : Locale) => dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]()

