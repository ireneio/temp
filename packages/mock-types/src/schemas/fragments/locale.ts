import gql from 'graphql-tag';

export default gql`
  fragment localeFragment on Locale {
    zh_TW
    en_US
    ja_JP
    vi_VN
  }
`;
