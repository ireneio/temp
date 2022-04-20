// import
import React, { useEffect } from 'react';

// definition
export default React.memo(({ coupon, points, computeOrderList }) => {
  useEffect(() => {
    if (coupon) computeOrderList({ coupon });
  }, [coupon, computeOrderList]);

  useEffect(() => {
    if (points) computeOrderList({ points });
  }, [points, computeOrderList]);

  return null;
});
