// import
import mock from '../mock';

// graphql typescript
import { iframeModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<iframeModuleMockFragment>('IframeModule', [
  () => ({
    __typename: 'IframeModule',
    htmlCode: '<div>iframe_with_normal_tag</div>',
  }),
  () => ({
    __typename: 'IframeModule',
    htmlCode: '<div style="color: red;">iframe_with_normal_tag</div>',
  }),
]);
