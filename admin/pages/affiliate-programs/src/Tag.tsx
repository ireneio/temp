// import
import React, { useMemo } from 'react';
import { compareAsc } from 'date-fns';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/tag.less';

// graphql typescript
import { tagFragment as tagFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  node: tagFragmentType;
}

// definition
export default React.memo(({ node: { startAt, endAt } }: PropsType) => {
  const { t } = useTranslation('affiliate-programs');
  const status = useMemo(() => {
    if (compareAsc(new Date(), new Date(startAt)) < 0) return 'NOT_START';

    if (endAt && compareAsc(new Date(endAt), new Date()) < 0) return 'IS_ENDED';

    return 'IN_PROGRESS';
  }, [startAt, endAt]);

  return (
    <span className={`${styles.root} ${styles[status] || ''}`}>
      {t(`tag.${status}`)}
    </span>
  );
});
