// import
import { useContext, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import {
  Cart as CartContext,
  Currency as CurrencyContext,
} from '@meepshop/context';

import { ACION_TYPES } from '../constants';

// graphql typescript
import { LocaleEnum } from '../../../../__generated__/meepshop';
import { useClickUserFragment as useClickUserFragmentType } from '../gqls/__generated__/useClickUserFragment';
import { useClickMenuPageObjectTypeFragment as useClickMenuPageObjectTypeFragmentType } from '../gqls/__generated__/useClickMenuPageObjectTypeFragment';
import {
  updateShopperLanguagePreference as updateShopperLanguagePreferenceType,
  updateShopperLanguagePreferenceVariables,
} from '../gqls/__generated__/updateShopperLanguagePreference';
import { logout as logoutType } from '../gqls/__generated__/logout';
import { updateLocaleCache as updateLocaleCacheType } from '../gqls/__generated__/updateLocaleCache';

// graphql import
import {
  updateShopperLanguagePreference,
  logout,
  updateLocaleCache,
} from '../gqls/useClick';

// definition
export default (
  user: useClickUserFragmentType | null,
  page: useClickMenuPageObjectTypeFragmentType,
): (() => Promise<void>) => {
  const { i18n } = useTranslation('menu');
  const { cartIsOpened, toggleCart } = useContext(CartContext);
  const { setCurrency } = useContext(CurrencyContext);
  const [updateShopperLanguagePreferenceMutation] = useMutation<
    updateShopperLanguagePreferenceType,
    updateShopperLanguagePreferenceVariables
  >(updateShopperLanguagePreference);
  const [logoutMutation] = useMutation<logoutType>(logout);

  return useCallback(async () => {
    const { action } = page;

    switch (ACION_TYPES[action || 0]) {
      case 'CART':
        toggleCart(!cartIsOpened);
        break;

      case 'LOGOUT':
        logoutMutation();
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
          await updateShopperLanguagePreferenceMutation({
            variables: {
              input: { locale: ACION_TYPES[action || 0] as LocaleEnum },
            },
            update: (cache, { data }) => {
              if (data?.updateShopperLanguagePreference.status !== 'OK') return;

              cache.writeFragment<updateLocaleCacheType>({
                id: userId,
                fragment: updateLocaleCache,
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
    updateShopperLanguagePreferenceMutation,
    logoutMutation,
  ]);
};
