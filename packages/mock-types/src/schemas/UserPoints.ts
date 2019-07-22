// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { UserPointsMock } from './__generated__/UserPointsMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment UserPointsMock on UserPoints {
    title {
      zh_TW
    }
    activity {
      zh_TW
    }
    note
    points
  }
`;

export default mock.add<UserPointsMock>('UserPoints', [
  () => ({
    __typename: 'UserPoints',
    title: {
      __typename: 'Locale',
      /* eslint-disable @typescript-eslint/camelcase */
      zh_TW: 'Title',
      /* eslint-enable @typescript-eslint/camelcase */
    },
    activity: {
      __typename: 'Locale',
      /* eslint-disable @typescript-eslint/camelcase */
      zh_TW: 'activity',
      /* eslint-enable @typescript-eslint/camelcase */
    },
    note: 'note',
    points: 10,
  }),
]);
