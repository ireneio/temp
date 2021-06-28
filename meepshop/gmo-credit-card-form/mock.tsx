// import
import React from 'react';
import { Form } from 'antd';

import GmoCreditCardForm from './src';

// definition
export default React.memo(() => (
  <Form>
    <GmoCreditCardForm storePaymentId="storePaymentId" isInstallment />
  </Form>
));
