// typescript import
import { PropsType as QuantityPropsType } from './Quantity';

// import
import React, { useState } from 'react';
import { filter } from 'graphql-anywhere';
import { emptyFunction } from 'fbjs';

import ProductSpecSelector from '@meepshop/product-spec-selector';

import Description from './Description';
import Quantity from './Quantity';
import AddButton from './AddButton';
import MobileSpecSelector from './mobileSpecSelector';
import useVariant from './hooks/useVariant';

// graphql typescript
import {
  productInfoFragment,
  productInfoFragment_product as productInfoFragmentProduct,
  quantityProductInfoModuleFragment as quantityProductInfoModuleFragmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  descriptionProductFragment,
  descriptionVariantFragment,
  descriptionUserFragment,
} from './gqls/description';
import {
  quantityVariantFragment,
  quantityProductInfoModuleFragment,
} from './gqls/quantity';
import {
  addButtonUserFragment,
  addButtonVariantFragment,
  addButtonStockNotificationFragment,
} from './gqls/addButton';
import { useVariantOrderListFragment } from './gqls/useVariant';
import {
  mobileSpecSelectorProductFragment,
  mobileSpecSelectorVariantFragment,
} from './mobileSpecSelector/gqls';

// definition
export default React.memo((props: productInfoFragment) => {
  const {
    unfoldedVariants,
    drawerOnMobile,
    unfoldedVariantsOnMobile,
    product,
    viewer,
    stockNotifications,
    cart,
  } = props;
  const [quantity, setQuantity] = useState<QuantityPropsType['value']>(0);
  const { variant, setVariant, min, max, quantityInCart } = useVariant<
    productInfoFragmentProduct
  >(product, filter(useVariantOrderListFragment, cart));
  const [visible, setVisible] = useState(false);

  return !product ? null : (
    <>
      <ProductSpecSelector<productInfoFragmentProduct>
        product={product}
        unfoldedVariants={unfoldedVariants}
        value={variant}
        onChange={setVariant}
      />

      <Description
        product={filter(descriptionProductFragment, product)}
        variant={filter(descriptionVariantFragment, variant)}
        viewer={filter(descriptionUserFragment, viewer)}
      />

      <Quantity
        {...filter<quantityProductInfoModuleFragmentType, productInfoFragment>(
          quantityProductInfoModuleFragment,
          props,
        )}
        variant={filter(quantityVariantFragment, variant)}
        max={max}
        value={quantity}
        onChange={setQuantity}
        quantityInCart={quantityInCart}
      />

      <AddButton
        viewer={filter(addButtonUserFragment, viewer)}
        variant={filter(addButtonVariantFragment, variant)}
        stockNotifications={filter(
          addButtonStockNotificationFragment,
          stockNotifications,
        )}
        min={min}
        max={max}
        quantityInCart={quantityInCart}
      />

      {!drawerOnMobile ? null : (
        <MobileSpecSelector
          product={filter(mobileSpecSelectorProductFragment, product)}
          variant={filter(mobileSpecSelectorVariantFragment, variant)}
          visible={visible}
          onClose={() => setVisible(false)}
          addProductToCart={emptyFunction /** TODO */}
          min={min > quantityInCart ? min - quantityInCart : 1}
          max={max > quantityInCart ? max - quantityInCart : 0}
          quantity={quantity || 0}
          onChangeQuantity={setQuantity}
        >
          <ProductSpecSelector<productInfoFragmentProduct>
            product={product}
            unfoldedVariants={unfoldedVariantsOnMobile}
            value={variant}
            onChange={setVariant}
          />
        </MobileSpecSelector>
      )}
    </>
  );
});
