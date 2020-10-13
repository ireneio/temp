// import
import { useContext, useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import {
  Cart as CartContext,
  Currency as CurrencyContext,
} from '@meepshop/context';

import { ACION_TYPES } from '../constants';

// graphql typescript
import { LocaleEnum } from '../../../../__generated__/meepshop';
import { useClickUserFragment as useClickUserFragmentType } from './fragments/__generated__/useClickUserFragment';
import { useClickMenuPageObjectTypeFragment as useClickMenuPageObjectTypeFragmentType } from './fragments/__generated__/useClickMenuPageObjectTypeFragment';
import {
  updateShopperLanguagePreference as updateShopperLanguagePreferenceType,
  updateShopperLanguagePreferenceVariables,
} from './__generated__/updateShopperLanguagePreference';
import { logout as logoutType } from './__generated__/logout';

// definition
export default (
  user: useClickUserFragmentType | null,
  page: useClickMenuPageObjectTypeFragmentType,
): (() => Promise<void>) => {
  const { i18n } = useTranslation('menu');
  const { cartIsOpened, toggleCart } = useContext(CartContext);
  const { setCurrency } = useContext(CurrencyContext);
  const [updateShopperLanguagePreference] = useMutation<
    updateShopperLanguagePreferenceType,
    updateShopperLanguagePreferenceVariables
  >(
    gql`
      mutation updateShopperLanguagePreference(
        $input: UpdateShopperLanguagePreferenceInput!
      ) {
        ## FIXME: T6711
        updateShopperLanguagePreference(input: $input) {
          status
        }
      }
    `,
  );
  const [logout] = useMutation<logoutType>(
    gql`
      mutation logout {
        logout @client {
          status
        }
      }
    `,
  );

  return useCallback(async () => {
    const { action } = page;

    switch (ACION_TYPES[action || 0]) {
      case 'CART':
        toggleCart(!cartIsOpened);
        break;

      case 'LOGOUT':
        logout();
        break;

      case 'zh_TW':
      case 'en_US':
      case 'ja_JP':
      case 'vi_VN':
      case 'fr_FR':
      case 'es_ES':
      case 'th_TH':
      case 'id_ID': {
        const userId = user?.id;

        if (user?.role === 'SHOPPER' && userId)
          await updateShopperLanguagePreference({
            variables: {
              input: { locale: ACION_TYPES[action || 0] as LocaleEnum },
            },
            update: (cache, { data }) => {
              if (data?.updateShopperLanguagePreference.status !== 'OK') return;

              cache.writeFragment({
                id: userId,
                fragment: gql`
                  fragment updateLocaleCache on User {
                    id
                    locale
                  }
                `,
                data: {
                  __typename: 'User',
                  id: userId,
                  locale: ACION_TYPES[action || 0],
                },
              });
            },
          });

        i18n.changeLanguage(ACION_TYPES[action || 0]);
        break;
      }

      case 'TWD':
      case 'USD':
      case 'CNY':
      case 'JPY':
      case 'EUR':
      case 'VND':
      case 'KRW':
      case 'HKD':
      case 'MYR':
        setCurrency(ACION_TYPES[action || 0]);
        break;

      default:
        break;
    }
  }, [
    user,
    page,
    i18n,
    cartIsOpened,
    toggleCart,
    setCurrency,
    updateShopperLanguagePreference,
    logout,
  ]);
};
