// import
import mock from '../mock';

// graphql typescript
import { VideoRatio } from '../../../../__generated__/meepshop';
import { videoModuleMockFragment } from './gqls/__generated__/videoModuleMockFragment';

// definition
const href =
  'https://www.youtube.com/embed/L8FK64bLJKE?autoplay=0&mute=0&controls=1&origin=https%3A%2F%2Fadmin.stage.meepcloud.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3';

export default mock.add<videoModuleMockFragment>('VideoModule', [
  () => ({
    __typename: 'VideoModule',
    width: '100',
    ratio: 'Ratio16to9' as VideoRatio,
    href,
  }),
]);
