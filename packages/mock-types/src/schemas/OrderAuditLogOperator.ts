// import
import mock from '../mock';

// graphql typescript
import {
  ViewerTypeEnum,
  orderChangeOperatorMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<orderChangeOperatorMockFragment>(
  'OrderAuditLogOperator',
  [
    () => ({
      __typename: 'OrderAuditLogOperator',
      type: 'MERCHANT' as ViewerTypeEnum,
      name: '',
      email: '',
    }),
    () => ({
      __typename: 'OrderAuditLogOperator',
      type: 'HELPER' as ViewerTypeEnum,
      name: 'helper',
      email: 'helper@meepshop.com',
    }),
    () => ({
      __typename: 'OrderAuditLogOperator',
      type: 'HELPER' as ViewerTypeEnum,
      name: '',
      email: 'helper@meepshop.com',
    }),
  ],
);
