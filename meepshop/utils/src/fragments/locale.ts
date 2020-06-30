// import
import gql from 'graphql-tag';

// graphql typescript
import { localeFragment } from './__generated__/localeFragment';

// definition
export type localeFragmentType = localeFragment;

export default gql`
  fragment localeFragment on Locale {
    zh_TW
    en_US
    ja_JP
    vi_VN
    fr_FR
    es_ES
    th_TH
    id_ID
  }
`;
