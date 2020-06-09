// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { BackgroundImageMock } from './__generated__/BackgroundImageMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment BackgroundImageMock on BackgroundImage {
    cover
    repeat
  }
`;

export default mock.add<BackgroundImageMock>('BackgroundImage', [
  () => ({
    __typename: 'BackgroundImage',
    image: {},
    cover: false,
    repeat: false,
  }),
  () => ({
    __typename: 'BackgroundImage',
    image: {},
    cover: true,
    repeat: false,
  }),
  () => ({
    __typename: 'BackgroundImage',
    image: {},
    cover: false,
    repeat: true,
  }),
  () => ({
    __typename: 'BackgroundImage',
    image: {},
    cover: true,
    repeat: true,
  }),
]);
