// typescript import
import { PropsType } from './index';

// import
import React from 'react';

// graphql typescript
import { productSpecSelectorFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default class ProductSpecSelector<
  P extends productSpecSelectorFragment
> extends React.PureComponent<PropsType<P>> {}
