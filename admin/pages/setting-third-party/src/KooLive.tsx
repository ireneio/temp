// import
import React from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/kooLive.less';

// graphql typescript
import { kooLiveFragment as kooLiveFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  cname: kooLiveFragmentType['cname'];
}

// definition
export default React.memo(({ cname }: PropsType) => {
  const { t } = useTranslation('setting-third-party');

  return (
    <div className={styles.item}>
      <div className={styles.title}>{t('koodata.items.title')}</div>

      <div className={styles.description}>{t('koodata.items.description')}</div>

      <Button className={styles.button}>
        <a
          href={`https://koolive.koodata.com/setting/integration?app=meepshop&shop_id=${cname}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('koodata.items.login')}
        </a>
      </Button>
    </div>
  );
});
