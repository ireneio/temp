// typescript import
import { languageType } from '@meepshop/utils/lib/i18n';

// import
import { useMemo } from 'react';

import { useTranslation } from '@meepshop/utils/lib/i18n';

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
  const { t, i18n } = useTranslation('menu');

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

        return title?.[i18n.language as languageType] || title?.zh_TW || null;

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
        return title?.[i18n.language as languageType] || title?.zh_TW || null;
    }
  }, [page, user, t, i18n]);
};
