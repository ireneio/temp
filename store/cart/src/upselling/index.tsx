// typescript import
import IconType from '@ant-design/icons/lib/components/Icon';

// import
import React, { useContext, useState } from 'react';
import { Carousel, Modal } from 'antd';
import transformColor from 'color';

import {
  Colors as ColorsContext,
  Sensor as SensorContext,
} from '@meepshop/context';
import { RightArrowCircleIcon, LeftArrowCircleIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';

import Product from './Product';
import styles from './styles/index.less';
import { RESPONSIVE } from './constants';

// graphql typescript
import { upsellingFragment as upsellingFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  upselling: upsellingFragmentType;
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

export default React.memo(({ upselling }: PropsType) => {
  const { t } = useTranslation('cart');
  const colors = useContext(ColorsContext);
  const { isMobile } = useContext(SensorContext);
  const [visible, setVisible] = useState(false);
  const { products } = upselling;

  return (
    <>
      <div className={styles.root}>
        <div className={styles.title}>
          {upselling.title || t('upselling.title')}
        </div>

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
                product={product}
                onClick={() => setVisible(true)}
              />
            ),
          )}
        </Carousel>
      </div>

      {!visible ? null : <Modal />}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              background-color: ${transformColor(colors[3]).alpha(0.08)};
            }

            .${styles.title} {
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
