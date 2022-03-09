import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Container } from 'components';
import * as CONST from 'constants';

export default class Index extends React.Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent } = context;

    return { userAgent, XMeepshopDomain };
  };

  static propTypes = {
    page: PropTypes.shape(CONST.PAGE_TYPE).isRequired,
  };

  render() {
    const { loading, page } = this.props;

    if (loading) return <Spin indicator={<LoadingOutlined spin />} />;

    if (!page) return null;

    const { keywords, description, image } = page.seo || {};

    return (
      <>
        <Head>
          {!description ? null : (
            <meta key="description" name="description" content={description} />
          )}

          <meta key="keywords" name="keywords" content={keywords} />

          {!image ? null : (
            <meta key="og:image" property="og:image" content={image} />
          )}

          {!description ? null : (
            <meta
              key="og:description"
              property="og:description"
              content={description}
            />
          )}
        </Head>

        <Container {...this.props} page={page} />
      </>
    );
  }
}
