import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { Container, ErrorPageNotFound } from 'components';
import ProductDiscontinued from 'components/ProductDiscontinued';

export default class Product extends React.Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent, query } = context;
    const { pId } = query;

    // FIXME: should use get getServerSideProps return notFound
    if (!pId) throw new Error('[FIXME] pId is undefined');

    return { pId, userAgent, XMeepshopDomain };
  };

  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.object,
      status: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    const { loading, product, page } = this.props;

    if (loading) return <Spin indicator={<LoadingOutlined spin />} />;

    if (!page || !product) return <ErrorPageNotFound />;

    const { status, coverImage, title } = product;
    const productImage = coverImage?.scaledSrc?.w480 || '';
    const productDescription = (() => {
      try {
        // eslint-disable-next-line camelcase
        return JSON.parse(product.description?.zh_TW).blocks.reduce(
          (result, { text }) => `${result} ${text}`,
          '',
        );
      } catch (e) {
        return '';
      }
    })();

    // eslint-disable-next-line camelcase
    const productName = title?.zh_TW;

    return (
      <>
        <Head>
          {!productName ? null : <title>{productName}</title>}

          {!productDescription ? null : (
            <meta
              key="description"
              name="description"
              content={productDescription}
            />
          )}

          {!productName ? null : (
            <meta key="keywords" name="keywords" content={productName} />
          )}

          {!productName ? null : (
            <meta key="og:title" property="og:title" content={productName} />
          )}

          {!productImage ? null : (
            <meta key="og:image" property="og:image" content={productImage} />
          )}

          {!productDescription ? null : (
            <meta
              key="og:description"
              property="og:description"
              content={productDescription}
            />
          )}
        </Head>

        {status ? (
          <Container {...this.props} page={page} product={product} />
        ) : (
          <ProductDiscontinued productName={productName} />
        )}
      </>
    );
  }
}
