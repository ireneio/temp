// typescript import
import { NextPage } from 'next';

// import
import React from 'react';

// graphql typescript

// graphql import

// typescript definition

// definition
const UpsellingProducts: NextPage = React.memo(() => <div />);

UpsellingProducts.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default UpsellingProducts;
