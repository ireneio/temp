// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { DividerModuleMock } from './__generated__/DividerModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment DividerModuleMock on DividerModule {
    width
    height
    justifyContent
    borderRadius
    background
  }
`;

export default mock.add<DividerModuleMock>('DividerModule', [
  () =>
    ({
      __typename: 'DividerModule',
      width: 50,
      height: 10,
      justifyContent: 'FLEX_START',
      borderRadius: 0,
      background: '#cccccc',
    } as DividerModuleMock),
  () =>
    ({
      __typename: 'DividerModule',
      width: 80,
      height: 30,
      justifyContent: 'CENTER',
      borderRadius: 0,
      background: '#000000',
    } as DividerModuleMock),
  () =>
    ({
      __typename: 'DividerModule',
      width: 90,
      height: 50,
      justifyContent: 'FLEX_END',
      borderRadius: 0,
      background: '#cccccc',
    } as DividerModuleMock),
]);
