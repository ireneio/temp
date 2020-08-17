import React, { useContext } from 'react';

import { Colors as ColorsContext } from '@meepshop/context';

import * as Utils from 'utils';

import './styles/index.less';

export default React.memo(
  (
    { title = '', goBackToOrders, children }, // eslint-disable-line
  ) => {
    const colors = useContext(ColorsContext);

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
  },
);
