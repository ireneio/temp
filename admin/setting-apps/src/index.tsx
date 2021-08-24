// typescript import
import { NextPage } from 'next';

// import
import React from 'react';

// graphql typescript

// graphql import

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const SettingAppsPage: NextPage<PropsType> = React.memo(() => <div />);

SettingAppsPage.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SettingAppsPage;
