// typescript import
import { CookiesType, getCookiesArgumentType } from '@meepshop/cookies';

// import
import { withCookies } from '@meepshop/cookies';

// graphql typescript
import { initAdminCookies as initAdminCookiesType } from '@meepshop/types/gqls/admin';

// graqphl import
import { initAdminCookies } from '../gqls/withCookies';

// definition
const IGNORE_PATHNAME = [
  '/login',
  '/sign-up/685b65e6791e',
  '/set-up-store/[token]',
  '/sign-up-fail',
  '/reset-password/[token]',
];

export default withCookies(
  async ({
    pathname,
    client,
    i18n,
    language,
    cookie,
  }: getCookiesArgumentType): Promise<CookiesType['cookies']> => {
    if (!IGNORE_PATHNAME.includes(pathname)) {
      const { data } = await client.query<initAdminCookiesType>({
        query: initAdminCookies,
      });
      const locale = data?.viewer?.store?.locale || 'zh_TW';

      if (locale !== language) await i18n.changeLanguage(locale);
    }

    return {
      menuCollapsed: cookie.get('menu-collapsed'),
    };
  },
);
