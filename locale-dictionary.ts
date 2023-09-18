import { Locale } from './i18n.config';

const dictionaries = {
  ua: () => import('./dictionaries/ua.json').then(module => module.default),
  en: () => import('./dictionaries/en.json').then(module => module.default),
}

//export const getDictionary = async (locale : Locale) => {dictionaries[locale]()}

export const getDictionary = async (locale: Locale) => {
  return locale == "ua" ? dictionaries.ua() : dictionaries.en(); 
}

//export const getDictionary = async (locale : Locale) => dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]()

//export const getDictionary = async (locale: Locale) =>
// dictionaries[locale]?.() ?? dictionaries.en()
 /*
 export const getDictionary = async (locale: Locale) => {
  if (locale === "ua"){
    return await dictionaries.ua()
  }
  else if (locale === "en") {
    return await dictionaries.en()
  }
  else return await dictionaries.er()
 }
 
 /*
export const getDictionary = async (locale: Locale) => {
  return await locale === 'ua' ? dictionaries.ua() : dictionaries.en();
};
export const getDictionary = async (locale: Locale) => {
  console.log(locale)
  return locale == 'ua' ? dictionaries.ua() : dictionaries.en(); 
};
*/
/*
export const getDictionary = async (locale: Locale) => {
  return await locale === 'ua' ? dictionaries.ua() : dictionaries.en();
};
*/

