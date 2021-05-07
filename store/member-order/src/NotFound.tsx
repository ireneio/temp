// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/notFound.less';

// graphql typescript
import { notFoundFragment as notFoundFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  user?: notFoundFragmentType | null;
}

// definition
export default React.memo(({ user }: PropsType) => {
  const { t } = useTranslation('member-order');

  return (
    <div className={styles.root}>
      <h4>{`Hi, ${user?.name || ''} (${user?.email || ''})`}</h4>
      <h1>{t('not-found')}</h1>
    </div>
  );
});
