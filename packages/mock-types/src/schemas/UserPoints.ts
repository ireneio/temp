// import
import mock from '../mock';

// graphql typescript
import { userPointsMockFragment } from './gqls/__generated__/userPointsMockFragment';

// definition
export default mock.add<userPointsMockFragment>('UserPoints', [
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
