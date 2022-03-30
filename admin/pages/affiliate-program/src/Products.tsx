// typescript import
import { PropsType as ProductsSelectorPropsType } from '@admin/products-selector';

// import
import React, { useState } from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import ProductsSelector from '@admin/products-selector';

// typescript definition
interface PropsType extends Pick<ProductsSelectorPropsType, 'onChange'> {
  value?: ProductsSelectorPropsType['products'];
}

// definition
export default React.memo(({ value, ...props }: PropsType) => {
  const { t } = useTranslation('affiliate-program');
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)} type="primary" ghost>
        {(value || []).length === 0
          ? t('products.select')
          : t('products.selected-products', { amount: value?.length })}
      </Button>

      <ProductsSelector
        {...props}
        visible={visible}
        products={value}
        onCancel={() => setVisible(false)}
        limit={200}
        sortDisabled
      />
    </>
  );
});
