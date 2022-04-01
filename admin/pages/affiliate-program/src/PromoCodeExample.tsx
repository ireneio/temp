// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/promoCodeExample.less';

// graphql typescript
import { promoCodeExampleFragment as promoCodeExampleFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  promoCode?: string;
  store: promoCodeExampleFragmentType | null;
}

// definition
export default React.memo(({ promoCode, store }: PropsType) => {
  const { t } = useTranslation('affiliate-program');
  const domain = `https://${store?.domain?.[0] || store?.defaultDomain}`;

  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('promoCode.example.title')}</div>

      <div className={styles.block}>
        <div className={styles.subTitle}>{t('promoCode.example.home')}</div>

        {domain}
        <span>?promoCode={promoCode}</span>
      </div>

      <div className={styles.block}>
        <div className={styles.subTitle}>{t('promoCode.example.products')}</div>
        {domain}/products<span>?promoCode={promoCode}</span>
      </div>
    </div>
  );
});
