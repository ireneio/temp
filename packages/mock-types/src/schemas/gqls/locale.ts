// import
import { gql } from '@apollo/client';

// definition
export const localeMockFragment = gql`
  fragment localeMockFragment on Locale {
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
