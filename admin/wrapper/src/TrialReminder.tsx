// import
import React from 'react';
import moment from 'moment';
import { Popover, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';

import { CountdownIcon } from '@meepshop/icons';
import Switch from '@meepshop/switch';

import styles from './styles/trialReminder.less';

// graphql typescript
import { storeMetaDataFragment as storeMetaDataFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  trialExpireAt: storeMetaDataFragmentType['trialExpireAt'];
  collapsed: boolean;
}

// definition
export default React.memo(({ trialExpireAt, collapsed }: PropsType) => {
  const { t } = useTranslation('common');
  const isMoreThanOneDay = moment(trialExpireAt).diff(moment(), 'hours') > 24;

  return (
    <Switch
      isTrue={collapsed}
      render={children => (
        <Popover
          overlayClassName={styles.popover}
          placement="rightBottom"
          trigger="click"
          content={children}
        >
          <div className={styles.icon}>
            <CountdownIcon />
          </div>
        </Popover>
      )}
    >
      <div
        className={`${styles.root} ${collapsed ? '' : styles.isNotCollapsed}`}
      >
        <div>
          {t(isMoreThanOneDay ? 'free-trial' : 'free-trial-next-day')}
          <span>
            {isMoreThanOneDay
              ? moment(trialExpireAt).diff(moment(), 'days')
              : moment(trialExpireAt).format('HH:mm')}
          </span>
          {t(isMoreThanOneDay ? 'expire-in-days' : 'expire')}
        </div>

        <Link href="/plan-setting">
          <Button type="primary">{t('upgrade-plan')}</Button>
        </Link>
      </div>
    </Switch>
  );
});
