// typescript import
import { PropsType } from './src';

// import
import React from 'react';
import { Form } from 'antd';

import GmoCreditCardForm from './src';

// graphql typescript
import { getGMOUserVariables } from '@meepshop/types/gqls/meepshop';

// definition
const EnhancedGmoCreditCardForm = Form.create<
  getGMOUserVariables & Pick<PropsType, 'isInstallment' | 'form'>
>()(GmoCreditCardForm);

export const props = {
  storePaymentId: 'storePaymentId',
  isInstallment: true,
};

export default React.memo(() => <EnhancedGmoCreditCardForm {...props} />);
