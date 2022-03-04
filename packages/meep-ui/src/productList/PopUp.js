import React from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Modal } from 'antd';

import ProductCarousel from '@meepshop/product-carousel';
import ProductCollections from '@meepshop/product-collections';
import { Sensor as SensorContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import ProductInfo from 'productInfo';

import styles from './styles/popUp.less';

const getPopUpProducts = gql`
  query getPopUpProducts($search: searchInputObjectType) {
    computeProductList(search: $search) {
      data {
        id
        status
        title {
          zh_TW
          en_US
        }
        description {
          zh_TW
          en_US
        }
        variants {
          id
          currentMinPurchasableQty
          currentMaxPurchasableQty
          sku
          listPrice
          suggestedPrice
          totalPrice
          specs {
            id
            specId
            title {
              zh_TW
              en_US
            }
          }
        }
        specs {
          id
          title {
            zh_TW
            en_US
          }
        }
        coverImage {
          id
          scaledSrc {
            w60
            w120
            w240
            w480
            w720
            w960
            w1200
            w1440
            w1680
            w1920
          }
        }
        galleries {
          images {
            id
            isMain
            scaledSrc {
              w60
              w120
              w240
              w480
              w720
              w960
              w1200
              w1440
              w1680
              w1920
            }
            imageExists
          }
        }
        showUserPrice {
          showListPrice
          showSuggestedPrice
        }
      }
    }
  }
`;

@withContext(SensorContext)
@withHook(({ target }) =>
  useQuery(getPopUpProducts, {
    variables: {
      search: {
        filter: {
          and: [
            {
              type: 'ids',
              ids: [target],
            },
          ],
        },
      },
    },
    skip: !target,
  }),
)
@enhancer
export default class PopUp extends React.PureComponent {
  rootRef = React.createRef();

  static propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,

    type: PropTypes.oneOf(['original', 'pop-up']).isRequired,
    popUpGalleryView: PropTypes.oneOf(['one', 'two', 'all', 'none']).isRequired,

    target: PropTypes.string,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    target: null,
    isMobile: null,
  };

  generateDetails = product => {
    const { type, popUpGalleryView, isMobile } = this.props;

    if (type === 'pop-up') {
      return (
        <div ref={this.rootRef}>
          {!['one', 'all', undefined].includes(popUpGalleryView) ? null : (
            <ProductCarousel
              className={styles.carousel}
              product={product}
              autoPlay={false}
              carouselInfo="BOTTOM"
            />
          )}

          <ProductInfo
            mode="list"
            productData={product}
            showButton={false}
            container={this.rootRef}
            isMobile={isMobile}
            type="pop-up"
            drawerOnMobile={false}
            unfoldedVariantsOnMobile={false}
          />

          {!['two', 'all'].includes(popUpGalleryView) ? null : (
            <ProductCollections
              className={styles.collections}
              product={product}
              productCollectionsType="ORIGIN"
              percentWidth="WIDTH100"
            />
          )}
        </div>
      );
    }

    return (
      <div ref={this.rootRef}>
        <ProductCarousel
          className={styles.carousel}
          product={product}
          autoPlay={false}
          carouselInfo="BOTTOM"
        />

        <ProductInfo
          mode="list"
          productData={product}
          showButton={false}
          container={this.rootRef}
          isMobile={isMobile}
        />
      </div>
    );
  };

  render() {
    const { className, title, visible, onCancel, target, data } = this.props;

    if (!target) return null;

    const product = data?.computeProductList?.data[0];

    if (!product || !product.id)
      return <Spin indicator={<LoadingOutlined spin />} />;

    return (
      <Modal
        className={className}
        title={title}
        visible={visible}
        onCancel={onCancel}
        footer={null}
        centered
        destroyOnClose
      >
        {this.generateDetails(product)}
      </Modal>
    );
  }
}
