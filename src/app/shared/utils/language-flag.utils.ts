// Mapeo de códigos de idioma a país para la bandera
const countryLangMap: Record<string, string> = {
  en: 'us',
  es: 'es',
  pt: 'pt',
};

const languageNameMap: Record<string, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
};

const urlBase = 'https://hatscripts.github.io/circle-flags/flags/';

export const getLanguageFlag = (lang: string): string => {
  const code = countryLangMap[lang.toLowerCase()] || lang.toLowerCase();
  return `${urlBase}${code}.svg`;
};

export const getLanguageName = (lang: string): string => {
  return languageNameMap[lang.toLowerCase()] || lang;
};
