// typescript definition
import { affiliateProgramsStatusType } from './constants';

// import
import React from 'react';
import { Divider, Button } from 'antd';

import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import { adminAffiliateProgramsPromotingEvent } from '@meepshop/images';

import styles from './styles/empty.less';

// typescript definition
interface PropsType {
  affiliateProgramsStatus: affiliateProgramsStatusType;
}

// definition
export default React.memo(({ affiliateProgramsStatus }: PropsType) => {
  const { t } = useTranslation('affiliate-programs');

  return (
    <>
      <Divider />

      <div className={styles.root}>
        <div>
          <img src={adminAffiliateProgramsPromotingEvent} alt="empty" />

          <div className={styles.title}>{t('empty.title')}</div>

          {t('empty.description')}

          <Link
            href={
              affiliateProgramsStatus === 'NO_PARTNERS'
                ? '/affiliate/partners/add'
                : '/affiliate/programs/add'
            }
          >
            <Button type="primary">
              {t(
                affiliateProgramsStatus === 'NO_PARTNERS'
                  ? 'empty.add-no-partners'
                  : 'empty.add-no-programs',
              )}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
});
