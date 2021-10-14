// typescript import
import { CookiesType, getCookiesArgumentType } from '@meepshop/cookies';

// import
import { withCookies } from '@meepshop/cookies';

// graphql typescript
import { initAdminCookies as initAdminCookiesType } from '@meepshop/types/gqls/admin';

// graqphl import
import { initAdminCookies } from '../gqls/withCookies';

// definition
export default withCookies(
  async ({
    pathname,
    client,
    i18n,
    language,
    cookie,
  }: getCookiesArgumentType): Promise<CookiesType['cookies']> => {
    if (
      !/^\/(login|sign-up|set-up-store|sign-up-fail|reset-password)/.test(
        pathname,
      )
    ) {
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
