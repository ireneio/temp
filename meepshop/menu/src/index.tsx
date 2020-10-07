// import
import React from 'react';

// graphql typescript
import { menuFragment } from './fragments/__generated__/menuFragment';
import { menuUserFragment } from './fragments/__generated__/menuUserFragment';

// typescript definition
export interface PropsType extends menuFragment {
  user: menuUserFragment;
}

// definition
export default React.memo((props: PropsType) => (
  <div>{JSON.stringify(props)}</div>
));
