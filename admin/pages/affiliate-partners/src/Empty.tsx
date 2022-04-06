// import
import React from 'react';
import { Divider, Button } from 'antd';

import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import { adminAffiliatePartnersPromotingPeople } from '@meepshop/images';

import styles from './styles/empty.less';

// definition
export default React.memo(() => {
  const { t } = useTranslation('affiliate-partners');

  return (
    <>
      <Divider className={styles.divider} />

      <div className={styles.root}>
        <div>
          <img src={adminAffiliatePartnersPromotingPeople} alt="empty" />

          <div className={styles.title}>{t('empty.title')}</div>

          {t('empty.description')}

          <Link href="/affiliate/partners/add">
            <Button type="primary">{t('empty.add')}</Button>
          </Link>
        </div>
      </div>
    </>
  );
});
