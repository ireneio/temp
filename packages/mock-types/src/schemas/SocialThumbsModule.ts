// import
import mock from '../mock';

// graphql typescript
import {
  JustifyContent,
  socialThumbsModuleMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
const href = 'https://www.google.com.tw';

export default mock.add<socialThumbsModuleMockFragment>('SocialThumbsModule', [
  () => ({
    __typename: 'SocialThumbsModule',
    href,
    justifyContent: 'FLEX_START' as JustifyContent,
  }),
  () => ({
    __typename: 'SocialThumbsModule',
    href,
    justifyContent: 'FLEX_END' as JustifyContent,
  }),
  () => ({
    __typename: 'SocialThumbsModule',
    href,
    justifyContent: 'CENTER' as JustifyContent,
  }),
  () => ({
    __typename: 'SocialThumbsModule',
    href,
    justifyContent: 'SPACE_BETWEEN' as JustifyContent,
  }),
  () => ({
    __typename: 'SocialThumbsModule',
    href,
    justifyContent: 'SPACE_AROUND' as JustifyContent,
  }),
]);
