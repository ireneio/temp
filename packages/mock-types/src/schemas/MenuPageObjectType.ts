// typescript import
import { ContextType, fieldsType } from '../mock';

// import
import mock from '../mock';

// graphql typescript
import {
  ImagePositionEnum,
  menuPageObjectTypeMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
const getPage = (action: number): menuPageObjectTypeMockFragment => ({
  __typename: 'MenuPageObjectType',
  action,
  title: {
    __typename: 'Locale',
    // eslint-disable-next-line @typescript-eslint/camelcase
    zh_TW: `action ${action}`,
  },
  imagePosition: 'LEFT' as ImagePositionEnum,
  newWindow: true,
});

export default mock.add<menuPageObjectTypeMockFragment>('MenuPageObjectType', [
  ({ action }: { action: number }, _: unknown, { isList }: ContextType) =>
    !isList
      ? getPage(action)
      : Object.keys(getPage(0)).reduce(
          (result, key: keyof menuPageObjectTypeMockFragment) => ({
            ...result,
            [key]: ({ action: pageAction }: { action: number }) =>
              getPage(pageAction)[key],
          }),
          {} as fieldsType<menuPageObjectTypeMockFragment, { id: string }>,
        ),
]);
