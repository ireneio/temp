// typescript import
import IconType from '@ant-design/icons/lib/components/Icon';

// import
import React, { useContext } from 'react';
import { Carousel } from 'antd';
import { filter } from 'graphql-anywhere';
import transformColor from 'color';

import {
  Colors as ColorsContext,
  Sensor as SensorContext,
} from '@meepshop/context';
import { RightArrowCircleIcon, LeftArrowCircleIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';

import Product from './Product';
import useCheckLimit from './hooks/useCheckLimit';
import styles from './styles/index.less';
import { RESPONSIVE } from './constants';

// graphql typescript
import {
  upsellingUserFragment as upsellingUserFragmentType,
  upsellingLineItemFragment as upsellingLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  productUserFragment,
  productProductFragment,
  productLineItemFragment,
} from './gqls/product';
import {
  useCheckLimitActiveUpsellingAreaFragment,
  useCheckLimitLineItemFragment,
} from './gqls/useCheckLimit';

// typescript definition
interface PropsType {
  viewer: upsellingUserFragmentType;
  cartItems: upsellingLineItemFragmentType[];
}

// definition
// FIXME: react-slick bug : unknown props `currentSlide`, `slideCount`
// https://github.com/akiran/react-slick/pull/1453
const CustomArrow = ({
  currentSlide, // eslint-disable-line @typescript-eslint/no-unused-vars
  slideCount, // eslint-disable-line @typescript-eslint/no-unused-vars
  Icon,
  ...props
}: {
  currentSlide?: string;
  slideCount?: string;
  Icon: typeof IconType;
}): React.ReactElement => (
  <span {...props}>
    <Icon />
  </span>
);

export default React.memo(({ viewer, cartItems }: PropsType) => {
  const { t } = useTranslation('cart');
  const colors = useContext(ColorsContext);
  const { isMobile } = useContext(SensorContext);
  const { isOverLimit, isWithProducts } = useCheckLimit({
    upselling: filter(
      useCheckLimitActiveUpsellingAreaFragment,
      viewer.store?.activeUpsellingArea || null,
    ),
    cartItems: filter(useCheckLimitLineItemFragment, cartItems),
  });
  const activeUpsellingArea = viewer.store?.activeUpsellingArea;
  const products = activeUpsellingArea?.products;

  if (!activeUpsellingArea || !products) return null;

  return (
    <>
      <div className={styles.root}>
        <div className={styles.title}>
          {activeUpsellingArea.title || t('upselling.title')}
        </div>

        {isWithProducts ? null : (
          <div className={styles.hint}>{t('upselling.hint')}</div>
        )}

        <Carousel
          className={styles.products}
          slidesToShow={5}
          slidesToScroll={5}
          variableWidth
          infinite={false}
          dots={false}
          arrows
          nextArrow={<CustomArrow Icon={RightArrowCircleIcon} />}
          prevArrow={<CustomArrow Icon={LeftArrowCircleIcon} />}
          responsive={RESPONSIVE}
        >
          {products.map(product =>
            !product ? null : (
              <Product
                key={product.id}
                viewer={filter(productUserFragment, viewer)}
                product={filter(productProductFragment, product)}
                cartItems={filter(productLineItemFragment, cartItems)}
                isOverLimit={isOverLimit}
                isWithProducts={isWithProducts}
              />
            ),
          )}
        </Carousel>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              background-color: ${transformColor(colors[3]).alpha(0.08)};
            }

            .${styles.title},
            .${styles.hint} {
              color: ${colors[3]};
            }

            .${styles.products} {
              width: ${
                products.length >= 5 || isMobile
                  ? '100%'
                  : `${products.length * 212}px`
              };
            }
            .${styles.products} .slick-arrow {
              color: ${colors[3]};
            }
            .${styles.products} .slick-dots li button {
              background: ${colors[3]};
              opacity: 0.2;
            }
            .${styles.products} .slick-dots li.slick-active button {
              background: ${colors[3]};
              opacity: 0.6;
            }
          `,
        }}
      />
    </>
  );
});
