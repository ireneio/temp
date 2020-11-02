// import
import mock from '../mock';

// graphql typescript
import { socialThumbsModuleMockFragment } from './gqls/__generated__/socialThumbsModuleMockFragment';

// definition
const href = 'https://www.google.com.tw';

export default mock.add<socialThumbsModuleMockFragment>('SocialThumbsModule', [
  () =>
    ({
      __typename: 'SocialThumbsModule',
      href,
      justifyContent: 'FLEX_START',
    } as socialThumbsModuleMockFragment),
  () =>
    ({
      __typename: 'SocialThumbsModule',
      href,
      justifyContent: 'FLEX_END',
    } as socialThumbsModuleMockFragment),
  () =>
    ({
      __typename: 'SocialThumbsModule',
      href,
      justifyContent: 'CENTER',
    } as socialThumbsModuleMockFragment),
  () =>
    ({
      __typename: 'SocialThumbsModule',
      href,
      justifyContent: 'SPACE_BETWEEN',
    } as socialThumbsModuleMockFragment),
  () =>
    ({
      __typename: 'SocialThumbsModule',
      href,
      justifyContent: 'SPACE_AROUND',
    } as socialThumbsModuleMockFragment),
]);
