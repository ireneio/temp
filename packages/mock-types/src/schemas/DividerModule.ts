// import
import mock from '../mock';

// graphql typescript
import { dividerModuleMockFragment } from './gqls/__generated__/dividerModuleMockFragment';

// definition
export default mock.add<dividerModuleMockFragment>('DividerModule', [
  () =>
    ({
      __typename: 'DividerModule',
      width: 50,
      height: 10,
      justifyContent: 'FLEX_START',
      borderRadius: 0,
      background: '#cccccc',
    } as dividerModuleMockFragment),
  () =>
    ({
      __typename: 'DividerModule',
      width: 80,
      height: 30,
      justifyContent: 'CENTER',
      borderRadius: 0,
      background: '#000000',
    } as dividerModuleMockFragment),
  () =>
    ({
      __typename: 'DividerModule',
      width: 90,
      height: 50,
      justifyContent: 'FLEX_END',
      borderRadius: 0,
      background: '#cccccc',
    } as dividerModuleMockFragment),
]);
