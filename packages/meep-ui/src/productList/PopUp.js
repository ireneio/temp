import React from 'react';
import PropTypes from 'prop-types';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Spin, Icon, Modal } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE } from 'constants/propTypes';
import ProductCarousel from 'productCarousel';
import ProductInfo from 'productInfo';
import ProductCollection from 'productCollection';

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
    wishList: PropTypes.arrayOf(
      PropTypes.shape({
        productId: ID_TYPE.isRequired,
      }),
    ).isRequired,

    target: PropTypes.string,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    target: null,
    isMobile: null,
  };

  generateDetails = product => {
    const { type, popUpGalleryView, wishList, target, isMobile } = this.props;

    if (type === 'pop-up') {
      return (
        <div ref={this.rootRef}>
          {['one', 'all', undefined].indexOf(popUpGalleryView) > -1 && (
            <ProductCarousel
              mode="list"
              coverImage={product.coverImage}
              galleries={product.galleries}
              autoPlay={false}
              thumbsPosition="bottom"
            />
          )}
          <ProductInfo
            mode="list"
            productData={product}
            isInWishList={wishList.some(item => item.productId === target)}
            showButton={false}
            container={this.rootRef}
            isMobile={isMobile}
            type="pop-up"
          />
          {['two', 'all'].indexOf(popUpGalleryView) > -1 && (
            <ProductCollection
              mode="list"
              galleries={product.galleries}
              align="original"
              title={product.title}
              contentWidth={100}
            />
          )}
        </div>
      );
    }

    return (
      <div ref={this.rootRef}>
        <ProductCarousel
          mode="list"
          coverImage={product.coverImage}
          galleries={product.galleries}
          autoPlay={false}
          thumbsPosition="bottom"
        />
        <ProductInfo
          mode="list"
          productData={product}
          isInWishList={wishList.some(item => item.productId === target)}
          showButton={false}
          container={this.rootRef}
          isMobile={isMobile}
        />
      </div>
    );
  };

  render() {
    const { className, title, visible, onCancel, target } = this.props;

    if (!target) return null;

    return (
      <Query
        query={gql`
          query PopUpProduct($search: searchInputObjectType) {
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
                  stock
                  maxPurchaseLimit
                  minPurchaseItems
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
                  }
                }
                showUserPrice {
                  showListPrice
                  showSuggestedPrice
                }
              }
            }
          }
        `}
        variables={{
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
        }}
      >
        {({ loading, error, data }) => {
          if (loading || error || !data)
            return <Spin indicator={<Icon type="loading" spin />} />;

          const product = data?.computeProductList?.data[0];

          if (!product || !product.id)
            return <Spin indicator={<Icon type="loading" spin />} />;

          return (
            <Modal
              className={className}
              title={title}
              visible={visible}
              onCancel={onCancel}
              footer={null}
              destroyOnClose
              centered
            >
              {this.generateDetails(product)}
            </Modal>
          );
        }}
      </Query>
    );
  }
}
