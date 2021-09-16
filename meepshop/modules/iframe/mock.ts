// import
import uuid from 'uuid/v4';

// definition
export default {
  __typename: 'IframeModule' as const,
  id: uuid(),
  htmlCode: '<div style="color: red;">iframe_with_normal_tag</div>',
};
