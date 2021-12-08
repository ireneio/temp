import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { getUnixTime, addDays } from 'date-fns';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { usePrevious } from '@meepshop/hooks';

import { getExpiringPoints } from '../gqls/useExpiringPoints';

export default () => {
  const { t } = useTranslation('common');
  const { data } = useQuery(getExpiringPoints, {
    variables: {
      expireBy: getUnixTime(addDays(new Date(), 30)),
    },
  });
  const role = data?.viewer?.role;
  const expiringPointsTotal =
    data?.viewer?.rewardPoint?.expiringPoints?.total || 0;
  const prevRole = usePrevious(role);

  useEffect(() => {
    if (
      role &&
      prevRole &&
      role !== prevRole &&
      role === 'SHOPPER' &&
      expiringPointsTotal > 0
    )
      notification.info({
        message: t('ducks:expired-points-message'),
        description: t('ducks:expired-points-description', {
          point: expiringPointsTotal,
        }),
      });
  }, [t, role, prevRole, expiringPointsTotal]);

  return {};
};
