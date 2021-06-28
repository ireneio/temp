// import
import uuid from 'uuid/v4';

// graphql typescript
import { ViewerTypeEnum } from '@meepshop/types/gqls/meepshop';

// definition
export default {
  __typename: 'ProductQaModule' as const,
  id: uuid(),
  width: 70,
  product: {
    __typename: 'Product' as const,
    id: uuid(),
    publicViewableQas: [
      {
        __typename: 'ProductQA' as const,
        userEmail: null,
        qa: [
          {
            __typename: 'QaObjectType' as const,
            id: uuid(),
            question: 'qa\n123\nabc',
            createdAt: '2020-07-29T16:39:25.652',
          },
          {
            __typename: 'QaObjectType' as const,
            id: uuid(),
            question: 'reply1',
            createdAt: '2020-07-29T16:40:25.652',
          },
          {
            __typename: 'QaObjectType' as const,
            id: uuid(),
            question: 'reply2',
            createdAt: '2020-07-29T16:40:30.652',
          },
        ],
      },
      {
        __typename: 'ProductQA' as const,
        userEmail: 'userEmail@meepshop.com',
        qa: [
          {
            __typename: 'QaObjectType' as const,
            id: uuid(),
            question: 'qa',
            createdAt: '2020-07-29T17:20:25.652',
          },
        ],
      },
    ],
  },
  viewer: {
    __typename: 'User' as const,
    id: uuid(),
    role: 'SHOPPER' as ViewerTypeEnum,
  },
};
