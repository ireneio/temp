// import
import React, { useContext } from 'react';
import { Drawer, Icon } from 'antd';
import { filter } from 'graphql-anywhere';

import { Colors as ColorsContext } from '@meepshop/context';
import useVariantsTree from '@meepshop/hooks/lib/useVariantsTree';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import Specs from './Specs';
import Title from './Title';
import styles from './styles/index.less';

// graphql typescript
import {
  productSpecSeletorFragment,
  productSpecSeletorFragment_variants as productSpecSeletorFragmentVariants,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { titleProductFragment, titleVariantFragment } from './gqls/title';

// typescript definition
export interface PropsType {
  product: productSpecSeletorFragment;
  variant: productSpecSeletorFragmentVariants;
  unfoldedVariantsOnMobile: boolean;
  visible: boolean;
  coordinates: number[];
  orderable: 'ORDERABLE' | 'NO_VARIANTS' | 'LIMITED' | 'OUT_OF_STOCK';
  quantity: number;
  addToCart: () => void;
  onClose: () => void;
  onChangeSpec: (order: number, index: number) => void;
  onChangeQuantity: (value: number) => void;
}

// definition
export default React.memo(
  ({
    product,
    variant,
    unfoldedVariantsOnMobile,
    visible,
    coordinates,
    orderable,
    quantity,
    addToCart,
    onClose,
    onChangeSpec,
    onChangeQuantity,
  }: PropsType) => {
    const { t } = useTranslation('product-spec-selector');
    const variantsTree = useVariantsTree(product);
    const colors = useContext(ColorsContext);

    return (
      <>
        <Drawer
          className={styles.root}
          title={
            <Title
              product={filter(titleProductFragment, product)}
              variant={filter(titleVariantFragment, variant)}
            />
          }
          placement="bottom"
          onClose={onClose}
          visible={visible}
        >
          <div className={styles.specs}>
            {!variantsTree ? null : (
              <Specs
                nodes={variantsTree}
                unfoldedVariantsOnMobile={unfoldedVariantsOnMobile}
                coordinates={coordinates}
                onChangeSpec={onChangeSpec}
              />
            )}
          </div>

          <div className={styles.control}>
            <div>
              <span
                onClick={() => {
                  if (quantity > (variant?.minPurchaseItems || 0))
                    // SHOULD_NOT_BE_NULL
                    onChangeQuantity(quantity - 1);
                }}
              >
                <Icon type="minus" />
              </span>
              <span>{quantity}</span>
              <span
                onClick={() => {
                  if (quantity < (variant?.maxPurchaseLimit || 0))
                    // SHOULD_NOT_BE_NULL
                    onChangeQuantity(quantity + 1);
                }}
              >
                <Icon type="plus" />
              </span>
            </div>
            <div
              className={styles.addToCart}
              onClick={() => {
                if (orderable === 'ORDERABLE') {
                  addToCart();
                  onClose();
                }
              }}
            >
              {t('add-to-cart')}
            </div>
          </div>
        </Drawer>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root},
              .${styles.root} .ant-drawer-title,
              .${styles.root} .ant-drawer-close {
                color: ${colors[3]};
              }

              .${styles.root} .ant-drawer-content,
              .${styles.root} .ant-drawer-header {
                background-color: ${colors[0]};
              }

              .${styles.root} .ant-drawer-content-wrapper {
                height: ${
                  product.specs?.length || 0 < 2 ? '60%' : '75%'
                } !important;
              }

              .${styles.addToCart} {
                background-color: ${colors[4]};
                color: ${colors[2]};
              }
              }
            `,
          }}
        />
      </>
    );
  },
);
