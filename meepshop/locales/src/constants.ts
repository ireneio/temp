// typescript import
import { WithTranslation } from 'next-i18next';

// typescript definition
export type languageType =
  | 'zh_TW'
  | 'en_US'
  | 'ja_JP'
  | 'vi_VN'
  | 'fr_FR'
  | 'es_ES'
  | 'th_TH'
  | 'id_ID';

export interface I18nPropsType extends WithTranslation {
  t: (key: string, options?: {}) => string;
  i18n: WithTranslation['i18n'] & {
    language: languageType;
  };
}

// definition
export const languages: languageType[] = [
  'zh_TW',
  'en_US',
  'ja_JP',
  'vi_VN',
  'fr_FR',
  'es_ES',
  'th_TH',
  'id_ID',
];
