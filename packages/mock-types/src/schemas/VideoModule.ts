// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { VideoModuleMock } from './__generated__/VideoModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment VideoModuleMock on VideoModule {
    width
    ratio
    href
  }
`;

const href =
  'https://www.youtube.com/embed/L8FK64bLJKE?autoplay=0&mute=0&controls=1&origin=https%3A%2F%2Fadmin.stage.meepcloud.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3';

export default mock.add<VideoModuleMock>('VideoModule', [
  () =>
    ({
      __typename: 'VideoModule',
      width: '100',
      ratio: 'Ratio16to9',
      href,
    } as VideoModuleMock),
]);
