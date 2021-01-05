// import
import mock from '../mock';

// graphql typescript
import {
  gtagTypeEnum,
  gtagEventNameEnum,
} from '../../../../__generated__/meepshop';
import { gtagMockFragment } from './gqls/__generated__/gtagMockFragment';

// definition
export default mock.add<gtagMockFragment>('gtag', [
  () => ({
    __typename: 'gtag',
    type: 'google_analytics' as gtagTypeEnum,
    eventName: 'analytics_config' as gtagEventNameEnum,
    code: 'google_analytics analytics_config',
  }),
  () => ({
    __typename: 'gtag',
    type: 'google_adwords' as gtagTypeEnum,
    eventName: 'purchase' as gtagEventNameEnum,
    code: `gtag('event', 'conversion', {'send_to': 'AW-google_adwords-purchase'});`,
  }),
]);
