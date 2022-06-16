import React from 'react';
import Head from 'next/head';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Container } from 'components';

export default React.memo(props => {
  const { loading, page } = props;

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

      <Container {...props} page={page} />
    </>
  );
});
