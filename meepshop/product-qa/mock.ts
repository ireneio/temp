// import
import uuid from 'uuid/v4';

// graphql typescript
import { PropsType } from './src/index';

// definition
export default {
  __typename: 'ProductQaModule',
  id: uuid(),
  width: 70,
  product: {
    __typename: 'Product',
    id: uuid(),
    publicViewableQas: [
      {
        userEmail: null,
        qa: [
          {
            id: uuid(),
            question: 'qa\n123\nabc',
            createdAt: '2020-07-29T16:39:25.652',
          },
          {
            id: uuid(),
            question: 'reply1',
            createdAt: '2020-07-29T16:40:25.652',
          },
          {
            id: uuid(),
            question: 'reply2',
            createdAt: '2020-07-29T16:40:30.652',
          },
        ],
      },
      {
        userEmail: 'userEmail@meepshop.com',
        qa: [
          {
            id: uuid(),
            question: 'qa',
            createdAt: '2020-07-29T17:20:25.652',
          },
        ],
      },
    ],
  },
  user: {
    __typename: 'User',
    id: uuid(),
    role: 'SHOPPER',
  },
} as PropsType;
