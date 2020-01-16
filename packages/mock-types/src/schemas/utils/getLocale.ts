// graphql typescript
import { localeFragment } from '../fragments/__generated__/localeFragment';

// definition
export default (text: string): localeFragment => ({
  __typename: 'Locale',
  /* eslint-disable @typescript-eslint/camelcase */
  zh_TW: text,
  en_US: text,
  ja_JP: text,
  vi_VN: text,
  fr_FR: text,
  es_ES: text,
  th_TH: text,
  id_ID: text,
  /* eslint-enable @typescript-eslint/camelcase */
});
