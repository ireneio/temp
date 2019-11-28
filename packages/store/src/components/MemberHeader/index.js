import React from 'react';
import * as Utils from 'utils';

import './styles/index.less';

export default (
  { title = '', goBackToOrders, colors, children }, // eslint-disable-line
) => (
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
