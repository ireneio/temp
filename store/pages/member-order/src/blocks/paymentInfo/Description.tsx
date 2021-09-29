// import
import React from 'react';

// graphql typescript
import { descriptionFragment as descriptionFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  order: descriptionFragmentType;
}

// definition
export default React.memo(({ order }: PropsType) => {
  const paidMessage = order.paidMessage?.slice(-1)[0]?.note || '';
  const description = order.paymentInfo?.list?.[0]?.description || '';

  return (
    <>
      {!paidMessage ? null : <pre>{paidMessage}</pre>}

      {!description ? null : <pre>{description}</pre>}
    </>
  );
});
