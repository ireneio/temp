// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';

import PrescoContent from './PrescoContent';
import styles from './styles/presco.less';

// graphql typescript
import { prescoFragment as prescoFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { prescoContentFragment } from './gqls/prescoContent';

// typescript definition
interface PropsType {
  viewer: prescoFragmentType | null;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('order-print');

  return (
    <>
      <p className={styles.tip}>{t('presco.tip')}</p>
      <div className={styles.root}>
        <PrescoContent viewer={filter(prescoContentFragment, viewer || null)} />
      </div>
    </>
  );
});
