import React from 'react';
import * as Utils from 'utils';

const wrapperStyle = {
  textAlign: 'center',
  height: 50,
  lineHeight: '50px',
  fontSize: '18px',
};

const arrowWrapperStyle = {
  position: 'absolute',
  height: '50px',
  width: '50px',
  lineHeight: '50px',
  cursor: 'pointer',
};

const arrowLeftStyle = {
  borderStyle: 'solid',
  borderRadius: '1px',
  borderWidth: '0 2px 2px 0',
  display: 'inline-block',
  padding: '5px',
  transform: 'rotate(135deg)',
  WebkitTransform: 'rotate(135deg)',
};

export default (
  { title = '', goBackToOrders, colors, children }, // eslint-disable-line
) => (
  <React.Fragment>
    <div
      style={{ ...wrapperStyle, backgroundColor: colors[4], color: colors[2] }}
    >
      {goBackToOrders && (
        <div
          style={arrowWrapperStyle}
          onClick={() => Utils.goTo({ pathname: '/orders' })}
        >
          <i style={{ ...arrowLeftStyle, borderColor: colors[2] }} />
        </div>
      )}
      {title}
    </div>
    {children}
  </React.Fragment>
);
