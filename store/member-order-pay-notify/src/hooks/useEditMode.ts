// import
import { useState, useEffect } from 'react';

// graphql typescript
import { getOrderPaidMessage_viewer_order as getOrderPaidMessageViewerOrder } from '@meepshop/types/gqls/store';

// definition
export default (
  paidMessage: getOrderPaidMessageViewerOrder['paidMessage'],
): [boolean, (editMode: boolean) => void] => {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEditMode((paidMessage || []).length === 0);
  }, [paidMessage]);

  return [editMode, setEditMode];
};
