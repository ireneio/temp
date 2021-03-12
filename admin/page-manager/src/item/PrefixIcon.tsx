// import
import React from 'react';
import { Tooltip, Icon } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { DefaultLayoutIcon } from '@meepshop/icons';

import styles from './styles/prefixIcon.less';

// graphql typescript
import { prefixIconPageFragment as prefixIconPageFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  page: prefixIconPageFragmentType;
}

// definition
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
