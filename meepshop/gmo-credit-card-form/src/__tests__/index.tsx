// typescript import
import { PropsType } from '../index';

// import
import React from 'react';
import { Form } from 'antd';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import GmoCreditCardForm from '../index';
import { props } from '../../mock';

// graphql typescript
import { getGMOUserVariables } from '@meepshop/types/gqls/meepshop';

// definition
const EnhancedGmoCreditCardForm = Form.create<
  getGMOUserVariables & Pick<PropsType, 'isInstallment' | 'form'>
>()(GmoCreditCardForm);

runTest('store', <EnhancedGmoCreditCardForm {...props} />);
