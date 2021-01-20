// import
import mock from '../mock';

// graphql typescript
import {
  JustifyContent,
  dividerModuleMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<dividerModuleMockFragment>('DividerModule', [
  () => ({
    __typename: 'DividerModule',
    width: 50,
    height: 10,
    justifyContent: 'FLEX_START' as JustifyContent,
    borderRadius: 0,
    background: '#cccccc',
  }),
  () => ({
    __typename: 'DividerModule',
    width: 80,
    height: 30,
    justifyContent: 'CENTER' as JustifyContent,
    borderRadius: 0,
    background: '#000000',
  }),
  () => ({
    __typename: 'DividerModule',
    width: 90,
    height: 50,
    justifyContent: 'FLEX_END' as JustifyContent,
    borderRadius: 0,
    background: '#cccccc',
  }),
]);
