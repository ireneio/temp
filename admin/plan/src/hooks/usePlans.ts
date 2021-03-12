// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  publicPlans as publicPlansType,
  publicPlans_publicPlans as publicPlansPublicPlans,
} from '@meepshop/types/gqls/admin';

// graphql import
import { publicPlans } from '../gqls/usePlans';

// typescript definition
export interface PlanType
  extends Omit<
    publicPlansPublicPlans,
    'avlProductNum' | 'freeDataGB' | 'orderFeeRate'
  > {
  avlProductNum: publicPlansPublicPlans['avlProductNum'] | string;
  space: string;
  freeDataGB: string;
  orderFeeRate: string;
}

// definition
export default (): { [key: string]: PlanType } => {
  const { t } = useTranslation('plan-setting');
  const { data } = useQuery<publicPlansType>(publicPlans);

  return (
    useMemo(
      () =>
        data?.publicPlans.reduce(
          (result, plan) => ({
            ...result,
            ...(plan
              ? {
                  [plan.id]: {
                    ...plan,
                    avlProductNum:
                      plan.avlProductNum > 0
                        ? plan.avlProductNum
                        : t('plan.unlimited'),
                    space: t('plan.unlimited'),
                    freeDataGB: `${plan.freeDataGB}G`,
                    orderFeeRate: `${
                      plan.orderFeeRate
                        ? (plan.orderFeeRate * 100).toFixed(1)
                        : plan.orderFeeRate
                    }%`,
                  },
                }
              : {}),
          }),
          {},
        ),
      [data, t],
    ) || {}
  );
};
