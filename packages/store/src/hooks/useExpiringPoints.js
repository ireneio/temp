import { useEffect, useRef } from 'react';
import { usePrevious } from 'react-use';
import { useQuery } from '@apollo/client';
import { getUnixTime, addDays } from 'date-fns';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

import { getExpiringPoints } from '../gqls/useExpiringPoints';

export default () => {
  const { t } = useTranslation('common');
  const expireByTimeRef = useRef(getUnixTime(addDays(new Date(), 30)));
  const { data } = useQuery(getExpiringPoints, {
    ssr: false,
    variables: {
      expireBy: expireByTimeRef.current,
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
