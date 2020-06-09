// import
import React from 'react';

import DraftText from '@meepshop/draft-text';

// graphql typescript
import { productDraftTextFragment } from './__generated__/productDraftTextFragment';

// definition
export default React.memo(({ id, product }: productDraftTextFragment) =>
  !product?.draftText?.value ? null : (
    <DraftText
      id={id}
      content={product.draftText.value}
      __typename="DraftTextModule"
    />
  ),
);
