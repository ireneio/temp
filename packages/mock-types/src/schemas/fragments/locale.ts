// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment localeFragment on Locale {
    zh_TW
    en_US
    ja_JP
    vi_VN
    fr_FR
    es_ES
  }
`;
