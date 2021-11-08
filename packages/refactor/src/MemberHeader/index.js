import React, { useEffect, useContext } from 'react';

import {
  Colors as ColorsContext,
  Role as RoleContext,
} from '@meepshop/context';
import { useRouter } from '@meepshop/link';

import styles from './styles/index.less';

export default React.memo(({ title = '', goBackToOrders, children }) => {
  const colors = useContext(ColorsContext);
  const role = useContext(RoleContext);
  const { push } = useRouter();
  const isShopper = role === 'SHOPPER';

  useEffect(() => {
    if (!isShopper) push('/login');
  }, [isShopper, push]);

  return (
    <div className={styles.root}>
      <div
        className={styles.title}
        style={{ backgroundColor: colors[4], color: colors[2] }}
      >
        {goBackToOrders && (
          <div className={styles.arrow} onClick={() => push('/orders')}>
            <i style={{ borderColor: colors[2] }} />
          </div>
        )}

        {title}
      </div>

      {children}
    </div>
  );
});
