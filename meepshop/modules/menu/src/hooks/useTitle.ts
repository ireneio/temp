// import
import { useMemo } from 'react';

import { useTranslation, useGetLanguage } from '@meepshop/locales';

import { ACION_TYPES } from '../constants';

// graphql typescript
import {
  useTitleUserFragment as useTitleUserFragmentType,
  useTitleMenuPageObjectTypeFragment as useTitleMenuPageObjectTypeFragmentType,
} from '@meepshop/types/gqls/meepshop';

// definition
export default (
  user: useTitleUserFragmentType | null,
  page: useTitleMenuPageObjectTypeFragmentType,
): string | null => {
  const { t } = useTranslation('menu');
  const getLanguage = useGetLanguage();

  return useMemo(() => {
    const { action, params, title } = page;

    switch (ACION_TYPES[action || 0]) {
      case 'SEARCH_BAR':
        return 'search-bar';

      case 'MEMBER':
        if (user?.role === 'SHOPPER')
          return params?.displayMemberGroup && user?.memberGroup?.name
            ? user?.memberGroup?.name
            : null;

        return getLanguage(title) || null;

      case 'zh_TW':
      case 'en_US':
      case 'ja_JP':
      case 'vi_VN':
      case 'fr_FR':
      case 'es_ES':
      case 'th_TH':
      case 'id_ID':
      case 'ORDERS':
      case 'SETTINGS':
      case 'RECIPIENTS':
      case 'PASSWORD_CHANGE':
      case 'WISHLIST':
      case 'REWARD_POINTS':
      case 'LOGOUT':
        return t(ACION_TYPES[action || 0]);

      case 'TWD':
      case 'USD':
      case 'HKD':
      case 'SGD':
        return `$ ${ACION_TYPES[action || 0]}`;

      case 'CNY':
      case 'JPY':
        return `¥ ${ACION_TYPES[action || 0]}`;

      case 'EUR':
        return '€ EUR';

      case 'VND':
        return '₫ VND';

      case 'KRW':
        return '₩ KRW';

      case 'MYR':
        return 'RM MYR';

      default:
        return getLanguage(title) || null;
    }
  }, [page, user, t, getLanguage]);
};
