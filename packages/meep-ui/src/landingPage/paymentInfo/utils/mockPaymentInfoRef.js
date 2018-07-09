import React from 'react';
import radium from 'radium';

export default Component =>
  radium(({ paymentInfoRef, ...props }) => (
    <Component {...props} ref={paymentInfoRef} />
  ));
