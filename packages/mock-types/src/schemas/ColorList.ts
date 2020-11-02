// import
import mock from '../mock';

// graphql typescript
import { colorListMockFragment } from './gqls/__generated__/colorListMockFragment';

// definition
export default mock.add<colorListMockFragment>('ColorList', [
  () => ({
    __typename: 'ColorList',
    data: [
      {
        __typename: 'Color',
        selected: '1',
        themes: [
          {
            __typename: 'themesObjectType',
            colors: [
              '#FFFFFF',
              '#FFFFFF',
              '#5f5f5f',
              '#4a4a4a',
              '#E6E6E6',
              '#CCCCCC',
            ],
          },
          {
            __typename: 'themesObjectType',
            colors: [
              '#ffffff',
              '#ffffff',
              '#5f5f5f',
              '#323232',
              '#ddb787',
              '#e1e1b5',
            ],
          },
          {
            __typename: 'themesObjectType',
            colors: [
              '#FFFFFF',
              '#FFFFFF',
              '#5F5F5F',
              '#323232',
              '#C2D6E7',
              '#DFD3CD',
            ],
          },
          {
            __typename: 'themesObjectType',
            colors: [
              '#FFFFFF',
              '#fafafa',
              '#5F5F5F',
              '#323232',
              '#fcd982',
              '#dcdcdc',
            ],
          },
          {
            __typename: 'themesObjectType',
            colors: [
              '#FFFFFF',
              '#FAFAFA',
              '#5F5F5F',
              '#6b6b6b',
              '#ffcec6',
              '#f1e1b0',
            ],
          },
        ],
      },
    ],
  }),
]);
