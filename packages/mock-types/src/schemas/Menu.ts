// import
import mock from '../mock';

// graphql typescript
import {
  ImagePositionEnum,
  menuMenuMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
const ACTIONS: number[] = [].constructor
  .apply({}, new Array(9))
  .map((_: unknown, index: number) => index)
  .filter((index: number) => index !== 4);

const IMAGES = ['ONLY', 'UPON', 'LEFT', 'RIGHT', null, 'BELOW'].map(
  (imagePosition: ImagePositionEnum) => ({
    imagePosition,
  }),
);

const generateMenuPages = (
  pages: menuMenuMockFragment['pages'] = null,
): menuMenuMockFragment['pages'] =>
  ACTIONS.map((action: number) => ({
    ...(IMAGES[action] || { imagePosition: null }),
    __typename: 'MenuPageObjectType',
    action,
    newWindow: true,
    pages,
  }));

export default mock.add<menuMenuMockFragment>('Menu', [
  () => ({
    __typename: 'Menu',
    pages: generateMenuPages(generateMenuPages(generateMenuPages())),
  }),
]);
