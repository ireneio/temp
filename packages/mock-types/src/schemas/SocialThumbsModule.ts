// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { SocialThumbsModuleMock } from './__generated__/SocialThumbsModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment SocialThumbsModuleMock on SocialThumbsModule {
    href
    justifyContent
  }
`;

const href = 'https://www.google.com.tw';

export default mock.add<SocialThumbsModuleMock>('SocialThumbsModule', [
  () =>
    ({
      __typename: 'SocialThumbsModule',
      href,
      justifyContent: 'FLEX_START',
    } as SocialThumbsModuleMock),
  () =>
    ({
      __typename: 'SocialThumbsModule',
      href,
      justifyContent: 'FLEX_END',
    } as SocialThumbsModuleMock),
  () =>
    ({
      __typename: 'SocialThumbsModule',
      href,
      justifyContent: 'CENTER',
    } as SocialThumbsModuleMock),
  () =>
    ({
      __typename: 'SocialThumbsModule',
      href,
      justifyContent: 'SPACE_BETWEEN',
    } as SocialThumbsModuleMock),
  () =>
    ({
      __typename: 'SocialThumbsModule',
      href,
      justifyContent: 'SPACE_AROUND',
    } as SocialThumbsModuleMock),
]);
