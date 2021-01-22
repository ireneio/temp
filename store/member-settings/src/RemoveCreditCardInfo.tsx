// import
import React, { useContext } from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';

import useRemoveGmoCreditCard from './hooks/useRemoveGmoCreditCard';
import styles from './styles/removeCreditCardInfo.less';

// definition
export default React.memo(({ id }: { id: string | null }) => {
  const { t } = useTranslation('member-settings');
  const colors = useContext(ColorsContext);
  const removeGmoCreditCard = useRemoveGmoCreditCard(id);

  return (
    <>
      <div className={styles.divider} style={{ background: colors[5] }} />

      <div className={styles.title} style={{ color: colors[3] }}>
        {t('remove-credit-card-info.title')}
      </div>
      <div className={styles.subTitle} style={{ color: colors[3] }}>
        {t('remove-credit-card-info.subTitle')}
      </div>

      <Button
        className={styles.submit}
        style={{ color: colors[3], borderColor: colors[3] }}
        onClick={() => removeGmoCreditCard()}
        size="large"
        type="primary"
      >
        {t('remove-credit-card-info.submit')}
      </Button>
    </>
  );
});
