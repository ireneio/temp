// import
import { useContext, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';

import { ACION_TYPES } from '../constants';

// graphql typescript
import {
  LocaleEnum,
  useClickUserFragment as useClickUserFragmentType,
  useClickMenuPageObjectTypeFragment as useClickMenuPageObjectTypeFragmentType,
  updateShopperLanguagePreference as updateShopperLanguagePreferenceType,
  updateShopperLanguagePreferenceVariables,
  logout as logoutType,
  updateLocaleCache as updateLocaleCacheType,
} from '@meepshop/types/gqls/meepshop';

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
  const { setCurrency } = useContext(CurrencyContext);
  const [updateShopperLanguagePreferenceMutation] = useMutation<
    updateShopperLanguagePreferenceType,
    updateShopperLanguagePreferenceVariables
  >(updateShopperLanguagePreference);
  const [logoutMutation] = useMutation<logoutType>(logout);

  return useCallback(async () => {
    const { action } = page;

    switch (ACION_TYPES[action || 0]) {
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
      case 'SGD':
        setCurrency(ACION_TYPES[action || 0]);
        break;

      default:
        break;
    }
  }, [
    user,
    page,
    i18n,
    setCurrency,
    updateShopperLanguagePreferenceMutation,
    logoutMutation,
  ]);
};
