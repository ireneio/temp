// import
import uuid from 'uuid/v4';

// graphql typescript
import { JustifyContent } from '@meepshop/types/gqls/meepshop';

// definition
export default {
  __typename: 'DividerModule' as const,
  id: uuid(),
  width: 100,
  height: 50,
  justifyContent: 'CENTER' as JustifyContent,
  borderRadius: 0,
  background: '#cccccc',
};
