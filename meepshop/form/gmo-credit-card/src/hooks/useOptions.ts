// typescript import
import { CascaderOptionType } from 'antd/lib/cascader';

// import
import { useMemo } from 'react';

import { useTranslation, useGetLanguage } from '@meepshop/locales';

// graphql typescript
import { useOptionsFragment as useOptionsFragmentType } from '@meepshop/types/gqls/meepshop';

// definition
export default (
  allGmoBankInstallments: useOptionsFragmentType[] | null,
): CascaderOptionType[] => {
  const { t } = useTranslation('gmo-credit-card-form');
  const getLanguage = useGetLanguage();

  return useMemo(
    (): CascaderOptionType[] =>
      (allGmoBankInstallments || []).map(
        ({ name, code, installments }, index) => ({
          value: index.toString(),
          label: getLanguage(name),
          children: installments.map(installment => ({
            value: `${code || ''}${installment}`,
            label: `${installment} ${t('installment')}`,
          })),
        }),
      ),
    [t, getLanguage, allGmoBankInstallments],
  );
};
