// import
import React, { useContext } from 'react';
import { filter } from 'graphql-anywhere';
import { Modal } from 'antd';
import transformColor from 'color';

import {
  Colors as ColorsContext,
  Currency as CurrencyContext,
} from '@meepshop/context';
import DraftText from '@meepshop/draft-text';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import ProductCarousel from '@meepshop/product-carousel';
import ProductCollections from '@meepshop/product-collections';
import ProductDraftText from '@meepshop/product-draft-text';
import ProductSpecSelector from '@meepshop/product-spec-selector';
import ProductVideo from '@meepshop/product-video';

import useAddUpselling from './hooks/useAddUpselling';
import useVariant from './hooks/useVariant';
import styles from './styles/modal.less';

// graphql typescript
import {
  modalUserFragment as modalUserFragmentType,
  modalProductFragment as modalProductFragmentType,
  modalLineItemFragment as modalLineItemFragmentType,
} from '@meepshop/types/gqls/store';
import {
  ProductCarouselModuleType,
  ProductCollectionsModuleType,
  PercentWidth,
  VideoRatio,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { productCarouselProductFragment } from '@meepshop/product-carousel/gqls';
import { productCollectionsProductFragment } from '@meepshop/product-collections/gqls';
import { productDraftTextProductFragment } from '@meepshop/product-draft-text/gqls';
import { productVideoProductFragment } from '@meepshop/product-video/gqls';

import {
  useAddUpsellingUserFragment,
  useAddUpsellingVariantFragment,
  useAddUpsellingLineItemFragment,
} from './gqls/useAddUpselling';

// typescript definition
interface PropsType {
  viewer: modalUserFragmentType;
  product: modalProductFragmentType;
  cartItems: (modalLineItemFragmentType | null)[];
  onCancel: () => void;
  isOverLimit: boolean;
  isWithProducts: boolean;
}

// definition
export default React.memo(
  ({
    viewer,
    product,
    cartItems,
    onCancel,
    isOverLimit,
    isWithProducts,
  }: PropsType) => {
    const { t } = useTranslation('cart');
    const getLanguage = useGetLanguage();
    const colors = useContext(ColorsContext);
    const { c } = useContext(CurrencyContext);
    const { variant, setVariant } = useVariant<modalProductFragmentType>(
      product,
    );
    const { status, addToCart } = useAddUpselling({
      productId: product.id || 'null-id',
      viewer: filter(useAddUpsellingUserFragment, viewer),
      variant: filter(useAddUpsellingVariantFragment, variant),
      cartItems: filter(useAddUpsellingLineItemFragment, cartItems),
      onCancel,
      isOverLimit,
      isWithProducts,
    });
    const { draftText, galleries, videoLink } = product;
    const hasCollections =
      galleries?.[1]?.images?.length &&
      galleries[1].images.every(image => image?.imageExists);

    return (
      <>
        <Modal
          className={styles.root}
          onCancel={onCancel}
          width={504}
          footer={null}
          destroyOnClose
          visible
        >
          <div>
            <ProductCarousel
              id="upselling"
              className={styles.carousel}
              __typename="ProductCarouselModule"
              productCarouselType={'BOTTOM' as ProductCarouselModuleType}
              autoPlay={false}
              product={filter(productCarouselProductFragment, product)}
            />

            <div className={styles.detail}>
              <div className={styles.sku}>{variant?.sku}</div>
              <div className={styles.title}>{getLanguage(product.title)}</div>
              <div className={styles.price}>
                <div>{c(variant?.totalPrice || 0)}</div>
                <div>{c(variant?.suggestedPrice || 0)}</div>
                <div>{c(variant?.retailPrice || 0)}</div>
              </div>

              <div className={styles.specs}>
                <ProductSpecSelector<modalProductFragmentType>
                  unfoldedVariants={false}
                  product={product}
                  value={variant}
                  onChange={setVariant}
                />
              </div>

              <div className={styles.description}>
                <DraftText
                  id="upselling"
                  content={getLanguage(product.description)}
                  __typename="DraftTextModule"
                />
              </div>
            </div>

            {!draftText.value && !hasCollections && !videoLink.value ? null : (
              <>
                <div className={styles.divider} />

                {!draftText.value ? null : (
                  <div className={styles.draft}>
                    <ProductDraftText
                      id="upselling"
                      __typename="ProductDraftTextModule"
                      product={filter(productDraftTextProductFragment, product)}
                    />
                  </div>
                )}

                {!hasCollections ? null : (
                  <ProductCollections
                    id="upselling"
                    className={styles.collections}
                    __typename="ProductCollectionsModule"
                    productCollectionsType={
                      'ORIGIN' as ProductCollectionsModuleType
                    }
                    percentWidth={'WIDTH100' as PercentWidth}
                    product={filter(productCollectionsProductFragment, product)}
                  />
                )}

                {!videoLink.value ? null : (
                  <div className={styles.video}>
                    <ProductVideo
                      id="upselling"
                      __typename="ProductVideoModule"
                      product={filter(productVideoProductFragment, product)}
                      width={100}
                      ratio={'Ratio16to10' as VideoRatio}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div
            className={`${styles.addToCart} ${
              status !== 'AVAILABLE' ? styles.disabled : ''
            }`}
            onClick={addToCart}
          >
            <div>{t(`upselling-modal.${status}`)}</div>
          </div>
        </Modal>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} {
                color: ${colors[3]};
              }

              .${styles.root} .ant-modal-content {
                background-color: ${colors[0]};
              }

              .${styles.addToCart} {
                box-shadow: 0 -1px 5px 0 ${transformColor(colors[3]).alpha(
                  0.1,
                )};
              }

              .${styles.addToCart} > div {
                background-color: ${colors[4]};
                box-shadow: 0 1px 5px 0 ${transformColor(colors[2]).alpha(0.2)};
                color: ${colors[2]};
              }

              .${styles.carousel} > div:first-child,
              .${styles.carousel} > div+div .meepshop-image__index__wrapper {
                border: 1px solid ${transformColor(colors[3]).alpha(
                  0.1,
                )} !important;
                background-color: ${colors[0]} !important;
              }
              
              .${styles.divider} {
                background-color: ${colors[5]};
              }
            `,
          }}
        />
      </>
    );
  },
);
