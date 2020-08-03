// import
import React from 'react';

// graphql typescript
import { menuFragment } from './__generated__/menuFragment';
import { menuUserFragment } from './__generated__/menuUserFragment';

// typescript definition
export interface PropsType extends menuFragment {
  user: menuUserFragment;
}

// definition
export default React.memo((props: PropsType) => (
  <div>{JSON.stringify(props)}</div>
));
