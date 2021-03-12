// typescript import
import { CascaderOptionType } from 'antd/lib/cascader';

import { languageType } from '@meepshop/locales';

// import
import { useMemo } from 'react';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import { useOptionsFragment as useOptionsFragmentType } from '@meepshop/types/gqls/meepshop';

// definition
export default (
  allGmoBankInstallments: useOptionsFragmentType[] | null,
): CascaderOptionType[] => {
  const { t, i18n } = useTranslation('gmo-credit-card-form');

  return useMemo(
    (): CascaderOptionType[] =>
      (allGmoBankInstallments || []).map(
        ({ name, code, installments }, index) => ({
          value: index.toString(),
          label: name[i18n.language as languageType] || name.zh_TW,
          children: installments.map(installment => ({
            value: `${code || ''}${installment}`,
            label: `${installment} ${t('installment')}`,
          })),
        }),
      ),
    [t, i18n.language, allGmoBankInstallments],
  );
};
