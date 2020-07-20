// typescript import
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { CustomCtxType } from '@meepshop/apollo';

// import
import gql from 'graphql-tag';

import { buildWithApollo } from '@meepshop/apollo';

import * as StoreAppList from './StoreAppList';
import * as User from './User';
import * as validatedConvenienceStoreCities from './validatedConvenienceStoreCities';
import * as viewer from './viewer';

// graphql typescript
import { getStoreLocaleAndCurrency } from './__generated__/getStoreLocaleAndCurrency';
import {
  updateShopperLanguagePreference,
  updateShopperLanguagePreferenceVariables,
} from './__generated__/updateShopperLanguagePreference';

// typescript definition
interface ReqType {
  i18n: I18nPropsType['i18n'];
  language: I18nPropsType['i18n']['language'];
  currency: string;
}

interface ResType {
  cookie: (name: string, value: string) => void;
}

// definition
const query = gql`
  query getStoreLocaleAndCurrency {
    viewer {
      id
      role
      locale
      store {
        id
        setting {
          locale
          currency
        }
      }
    }
  }
`;

const mutation = gql`
  mutation updateShopperLanguagePreference(
    $input: UpdateShopperLanguagePreferenceInput!
  ) {
    updateShopperLanguagePreference(input: $input) {
      status
    }
  }
`;

export default buildWithApollo({
  name: 'store',
  resolvers: [
    StoreAppList.resolvers,
    User.resolvers,
    validatedConvenienceStoreCities.resolvers,
    viewer.resolvers,
  ],
  errorFilter: ({ message }: Error) =>
    message !== '[repository] getOrderWithProductsByIdProtectedScope error',
  initCookies: async (
    client: ApolloClient<NormalizedCacheObject>,
    { ctx: { req, res } }: CustomCtxType<ReqType, ResType>,
  ) => {
    const result = await client.query<getStoreLocaleAndCurrency>({ query });
    const locales = result.data?.viewer?.store?.setting?.locale || ['zh_TW'];
    const locale = result.data?.viewer?.locale || '';
    const currencys = result.data?.viewer?.store?.setting?.currency || ['TWD'];
    const isLogin = result.data?.viewer?.role === 'SHOPPER';
    const language = (() => {
      if (locales.includes(locale)) return locale;

      if (locales.includes(req.language)) return req.language;

      return locales[0];
    })();

    if (language) {
      if (req.i18n && language !== req.language)
        await req.i18n.changeLanguage(language);

      if (isLogin && language !== locale)
        await client.mutate<
          updateShopperLanguagePreference,
          updateShopperLanguagePreferenceVariables
        >({
          mutation,
          variables: {
            input: { locale: language },
          } as updateShopperLanguagePreferenceVariables,
        });
    }

    if (!req.currency || !currencys.includes(req.currency)) {
      const currency = currencys?.[0];

      if (currency) {
        req.currency = currency;
        res.cookie('currency', currency);
      }
    }
  },
});
