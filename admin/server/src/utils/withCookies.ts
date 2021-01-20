// typescript import

import { CookiesType, getCookiesArgumentType } from '@meepshop/cookies';

// import
import gql from 'graphql-tag';

import { withCookies } from '@meepshop/cookies';

// graphql typescript
import { initAdminCookies } from '@meepshop/types/gqls/admin';

// definition
const query = gql`
  query initAdminCookies {
    viewer {
      id
      store {
        id
        locale
      }
    }
  }
`;

export default withCookies(
  async ({
    client,
    i18n,
    language,
    cookie,
  }: getCookiesArgumentType): Promise<CookiesType['cookies']> => {
    const { data } = await client.query<initAdminCookies>({ query });
    const locale = data?.viewer?.store?.locale || 'zh_TW';

    if (locale !== language) await i18n.changeLanguage(locale);

    return {
      menuCollapsed: cookie.get('menu-collapsed'),
    };
  },
);
