// typescript import
import { FormInstance } from 'antd/lib/form';

import { ValuesType } from './useInitialValue';

// import
import { useCallback } from 'react';

import { useRouter } from '@meepshop/link';

import alertStyles from '../styles/alert.less';
import productsStyles from '../styles/products.less';
import shipmentStyles from '../styles/shipment.less';

// definition
export default (
  { validateFields, getFieldValue }: FormInstance,
  loading: boolean,
): (() => void) => {
  const { push } = useRouter();

  return useCallback(() => {
    if (loading) return;

    validateFields()
      .then(() => {
        const shipment = getFieldValue(['shipment']);
        if (shipment)
          window.sessionStorage.setItem('shipment', JSON.stringify(shipment));

        const products = (getFieldValue([
          'products',
        ]) as ValuesType['products']).reduce(
          (
            value,
            { type, quantity, productId, variantId, applicableShipments },
          ) => {
            if (
              type === 'GIFT' ||
              !applicableShipments?.find(({ id }) => id === shipment.id)
            )
              return value;

            return [...value, { quantity, productId, variantId }];
          },
          [],
        );
        window.sessionStorage.setItem('products', JSON.stringify(products));

        push('/checkout');
      })
      .catch(() => {
        const alertDom = document.querySelector(`.${alertStyles.error}`);
        if (alertDom) {
          alertDom.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        const productsDom = document.querySelector(`.${productsStyles.error}`);
        if (productsDom) {
          productsDom.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        const shipmentDom = document.querySelector(`.${shipmentStyles.error}`);
        if (shipmentDom) shipmentDom.scrollIntoView({ behavior: 'smooth' });
      });
  }, [push, validateFields, getFieldValue, loading]);
};
