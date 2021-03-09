// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import Description from './Description';

// graphql typescript
import { productInfoFragment } from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  descriptionProductFragment,
  descriptionVariantFragment,
  descriptionUserFragment,
} from './gqls/description';

// definition
export default React.memo(({ product, viewer }: productInfoFragment) => (
  <Description
    product={filter(descriptionProductFragment, product)}
    variant={filter(descriptionVariantFragment, null /** TODO */)}
    viewer={filter(descriptionUserFragment, viewer)}
  />
));
