// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useCallback } from 'react';

import { useRouter } from '@meepshop/link';

import alertStyles from '../styles/alert.less';
import productsStyles from '../styles/products.less';

// definition
export default ({ validateFields }: FormInstance): (() => void) => {
  const { push } = useRouter();

  return useCallback(() => {
    validateFields()
      .then(() => {
        push('/checkout');
      })
      .catch(() => {
        const alertDom = document.querySelector(`.${alertStyles.error}`);
        if (alertDom) {
          alertDom.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        const productsDom = document.querySelector(`.${productsStyles.error}`);
        if (productsDom) productsDom.scrollIntoView({ behavior: 'smooth' });
      });
  }, [push, validateFields]);
};
