// import
import React from 'react';
import gql from 'graphql-tag';
import { Tooltip, Icon } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { DefaultLayoutIcon } from '@meepshop/icons';

import styles from './styles/prefixIcon.less';

// graphql typescript
import { prefixIconPageFragment as prefixIconPageFragmentType } from './__generated__/prefixIconPageFragment';

// typescript definition
interface PropsType {
  page: prefixIconPageFragmentType;
}

// definition
export const prefixIconStoreFragment = gql`
  fragment prefixIconStoreFragment on Store {
    id
    defaultHomePage {
      id
    }
    defaultProductTemplatePage {
      id
    }
  }
`;

export const prefixIconPageFragment = gql`
  fragment prefixIconPageFragment on Page {
    id
    isDefaultHomePage @client
    isDefaultProductTemplatePage @client
  }
`;

export default React.memo(
  ({
    page: { isDefaultHomePage, isDefaultProductTemplatePage },
  }: PropsType) => {
    const { t } = useTranslation('page-manager');

    if (isDefaultHomePage)
      return (
        <Tooltip title={t('home-page.icon-hint')}>
          <Icon className={styles.root} type="home" />
        </Tooltip>
      );

    if (isDefaultProductTemplatePage)
      return (
        <Tooltip title={t('default-product-list-page.icon-hint')}>
          <DefaultLayoutIcon className={styles.root} />
        </Tooltip>
      );

    return null;
  },
);
