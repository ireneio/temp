// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { IframeModuleMock } from './__generated__/IframeModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment IframeModuleMock on IframeModule {
    htmlCode
  }
`;

export default mock.add<IframeModuleMock>('IframeModule', [
  () =>
    ({
      __typename: 'IframeModule',
      htmlCode: '<div>iframe_with_normal_tag</div>',
    } as IframeModuleMock),
  () =>
    ({
      __typename: 'IframeModule',
      htmlCode: '<div style="color: red;">iframe_with_normal_tag</div>',
    } as IframeModuleMock),
]);
