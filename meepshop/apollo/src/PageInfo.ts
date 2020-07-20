// typescript import
import { ContextType } from './index';

// import
import gql from 'graphql-tag';

// graphql typescript
// TODO: should use __generated__/meepshop
import { SetCurrentInput } from '../../../__generated__/store';

import { pageInfoFragment } from './__generated__/pageInfoFragment';

// definition
const fragment = gql`
  fragment pageInfoFragment on CurrentInfo {
    id
    current
  }
`;

export const resolvers = {
  Mutation: {
    setCurrent: (
      _: unknown,
      { input: { pageId, current } }: { input: SetCurrentInput },
      { cache }: ContextType,
    ) => {
      cache.writeFragment<pageInfoFragment>({
        id: pageId,
        fragment,
        data: {
          __typename: 'CurrentInfo',
          id: pageId,
          current,
        },
      });

      return true;
    },
  },
  PageInfo: {
    currentInfo: (
      _: unknown,
      { input: { pageId } }: { input: { pageId: string } },
    ) => ({
      __typename: 'CurrentInfo',
      id: pageId,
      current: 0,
    }),
  },
};
