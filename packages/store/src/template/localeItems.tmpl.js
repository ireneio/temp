/* eslint-disable camelcase */
import zh_TW from 'public/locales/zh_TW/common.json';
import en_US from 'public/locales/en_US/common.json';
import ja_JP from 'public/locales/ja_JP/common.json';
import vi_VN from 'public/locales/vi_VN/common.json';
import fr_FR from 'public/locales/fr_FR/common.json';
import es_ES from 'public/locales/es_ES/common.json';
import th_TH from 'public/locales/th_TH/common.json';
import id_ID from 'public/locales/id_ID/common.json';
/* eslint-enable camelcase */

const LOCALE = {
  zh_TW,
  en_US,
  ja_JP,
  vi_VN,
  fr_FR,
  es_ES,
  th_TH,
  id_ID,
};

export default Object.keys(LOCALE).reduce(
  (result, key) => [
    ...result,
    {
      id: key,
      title: Object.keys(LOCALE).reduce(
        (titleResult, titleKey) => ({
          ...titleResult,
          [titleKey]: LOCALE[key].locale,
        }),
        {},
      ),
      action: 'locale',
      newWindow: false,
    },
  ],
  [],
);
