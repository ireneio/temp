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
  productInfoFragment as productInfoFragmentType,
  productInfoFragment_product as productInfoFragmentProduct,
  useVariantLineItemFragment as useVariantLineItemFragmentType,
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
import { useVariantLineItemFragment } from './gqls/useVariant';
import {
  mobileSpecSelectorProductFragment,
  mobileSpecSelectorVariantFragment,
} from './mobileSpecSelector/gqls';

// typescript definition
interface PropsType extends productInfoFragmentType {
  cart: useVariantLineItemFragmentType[] | null;
}

// definition
export default React.memo((props: PropsType) => {
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
  const { variant, setVariant, quantityInCart } = useVariant<
    productInfoFragmentProduct
  >(product, filter(useVariantLineItemFragment, cart));
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
        {...filter<
          quantityProductInfoModuleFragmentType,
          productInfoFragmentType
        >(quantityProductInfoModuleFragment, props)}
        variant={filter(quantityVariantFragment, variant)}
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
        quantityInCart={quantityInCart}
      />

      {!drawerOnMobile ? null : (
        <MobileSpecSelector
          product={filter(mobileSpecSelectorProductFragment, product)}
          variant={filter(mobileSpecSelectorVariantFragment, variant)}
          visible={visible}
          onClose={() => setVisible(false)}
          addProductToCart={emptyFunction /** TODO */}
          quantity={quantity || 0}
          quantityInCart={quantityInCart}
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
