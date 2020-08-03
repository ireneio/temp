// import
import uuid from 'uuid/v4';

// graphql typescript
import { PropsType } from './src/index';

// definition
export default {
  __typename: 'MenuModule',
  id: uuid(),
  menu: {
    __typename: 'Menu',
    id: uuid(),
  },
  user: {
    __typename: 'User',
    id: uuid(),
    role: 'GUEST',
  },
} as PropsType;
