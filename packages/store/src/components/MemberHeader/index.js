import React, { useEffect, useContext } from 'react';

import {
  Colors as ColorsContext,
  Role as RoleContext,
} from '@meepshop/context';
import { useRouter } from '@meepshop/link';

import * as Utils from 'utils';

import './styles/index.less';

export default React.memo(({ title = '', goBackToOrders, children }) => {
  const colors = useContext(ColorsContext);
  const role = useContext(RoleContext);
  const { push } = useRouter();
  const isShopper = role === 'SHOPPER';

  useEffect(() => {
    if (!isShopper) push('/login');
  }, [isShopper, push]);

  return (
    <div className="member-root">
      <div
        className="title"
        style={{ backgroundColor: colors[4], color: colors[2] }}
      >
        {goBackToOrders && (
          <div
            className="arrow"
            onClick={() => Utils.goTo({ pathname: '/orders' })}
          >
            <i style={{ borderColor: colors[2] }} />
          </div>
        )}

        {title}
      </div>

      {children}
    </div>
  );
});
