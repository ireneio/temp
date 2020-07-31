// import
import React from 'react';
import gql from 'graphql-tag';

// graphql typescript
import { descriptionFragment as descriptionFragmentType } from './__generated__/descriptionFragment';

// typescript definition
interface PropsType {
  order: descriptionFragmentType;
}

// definition
export const descriptionFragment = gql`
  fragment descriptionFragment on Order {
    id

    paidMessage {
      note
    }

    paymentInfo {
      id
      list {
        id
        description
      }
    }
  }
`;

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
