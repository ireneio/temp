// import
import React from 'react';

import DraftText from '@meepshop/draft-text';

// graphql typescript
import { productDraftTextProductDraftTextModuleFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default React.memo(
  ({ id, product }: productDraftTextProductDraftTextModuleFragment) =>
    !product?.draftText?.value ? null : (
      <DraftText
        id={id}
        content={product.draftText.value}
        __typename="DraftTextModule"
      />
    ),
);
