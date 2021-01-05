// import
import mock from '../mock';

// graphql typescript
import { iframeModuleMockFragment } from './gqls/__generated__/iframeModuleMockFragment';

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
