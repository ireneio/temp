// import
import React, { useEffect } from 'react';

// definition
export default React.memo(({ coupon, points, computeOrderList }) => {
  useEffect(() => {
    computeOrderList({ coupon });
  }, [coupon, computeOrderList]);

  useEffect(() => {
    computeOrderList({ points });
  }, [points, computeOrderList]);

  return null;
});
