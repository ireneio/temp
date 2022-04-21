// import
import React, { useEffect } from 'react';

// definition
export default React.memo(({ coupon, points, computeOrderList }) => {
  useEffect(() => {
    if (coupon !== undefined) computeOrderList({ coupon });
  }, [coupon, computeOrderList]);

  useEffect(() => {
    if (points !== undefined) computeOrderList({ points });
  }, [points, computeOrderList]);

  return null;
});
