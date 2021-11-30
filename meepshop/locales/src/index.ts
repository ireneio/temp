// typescript definition
export { I18n } from 'next-i18next';

export { languageType, I18nPropsType } from './constants';

// definition
export {
  withTranslation,
  appWithTranslation,
  i18n,
  useTranslation,
} from './i18n';

export { languages } from './constants';

export { default as useGetLanguage } from './hooks/useGetLanguage';
