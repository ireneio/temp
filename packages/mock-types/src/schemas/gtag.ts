// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { gtagMock } from './__generated__/gtagMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment gtagMock on gtag {
    type
    eventName
    code
  }
`;

export default mock.add<gtagMock>('gtag', [
  () =>
    ({
      __typename: 'gtag',
      type: 'google_analytics',
      eventName: 'analytics_config',
      code: 'google_analytics analytics_config',
    } as gtagMock),
  () =>
    ({
      __typename: 'gtag',
      type: 'google_adwords',
      eventName: 'purchase',
      code: `gtag('event', 'conversion', {'send_to': 'AW-google_adwords-purchase'});`,
    } as gtagMock),
]);
