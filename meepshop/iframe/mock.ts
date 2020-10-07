// import
import uuid from 'uuid/v4';

// graphql typescript
import { iframeFragment } from './src/fragments/__generated__/iframeFragment';

// definition
export default {
  id: uuid(),
  __typename: 'IframeModule',
  htmlCode: '<div style="color: red;">iframe_with_normal_tag</div>',
} as iframeFragment;
