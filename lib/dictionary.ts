import type { Locale } from '../i18n.config';

const dictionaries = {
  ua: () => import('../dictionaries/ua.json').then(module => module.default),
  en: () => import('../dictionaries/en.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => {
  return locale === 'ua' ? dictionaries.ua() : dictionaries.en();
};
