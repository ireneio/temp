import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { isEmpty } from 'fbjs';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { Role as RoleContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import * as Utils from 'utils';
import { Container, Error as ErrorComponent } from 'components';
import ProductDiscontinued from 'components/ProductDiscontinued';

class Product extends React.Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent, query } = context;
    const { pId } = query;

    // FIXME: should use get getServerSideProps return notFound
    if (!pId) throw new Error('[FIXME] pId is undefined');

    return { pId, userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.object,
      status: PropTypes.number.isRequired,
    }).isRequired,
  };

  static defaultProps = { error: null };

  render() {
    const { error, product, page } = this.props;

    /* Display Error View */
    if (error) return <ErrorComponent error={error} />;

    if (isEmpty(product)) return <Spin indicator={<LoadingOutlined spin />} />;

    const { status, coverImage, title } = product;

    if (!page) return null;

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

const mapStateToProps = state => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {};
};

export default connect(mapStateToProps)(
  withTranslation('common')(
    withContext(RoleContext, role => ({ role }))(Product),
  ),
);
