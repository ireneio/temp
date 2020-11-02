// import
import mock from '../mock';

// graphql typescript
import { gtagMockFragment } from './gqls/__generated__/gtagMockFragment';

// definition
export default mock.add<gtagMockFragment>('gtag', [
  () =>
    ({
      __typename: 'gtag',
      type: 'google_analytics',
      eventName: 'analytics_config',
      code: 'google_analytics analytics_config',
    } as gtagMockFragment),
  () =>
    ({
      __typename: 'gtag',
      type: 'google_adwords',
      eventName: 'purchase',
      code: `gtag('event', 'conversion', {'send_to': 'AW-google_adwords-purchase'});`,
    } as gtagMockFragment),
]);
