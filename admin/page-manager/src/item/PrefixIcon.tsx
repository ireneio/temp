// import
import React from 'react';
import { Tooltip, Icon } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { DefaultLayoutIcon } from '@meepshop/icons';

import styles from './styles/prefixIcon.less';

// typescript definition
interface PropsType {
  isHomePage: boolean;
  isDefaultTemplatePage: boolean | null;
}

// definition
export default React.memo(
  ({ isHomePage, isDefaultTemplatePage }: PropsType) => {
    const { t } = useTranslation('page-manager');

    if (isHomePage)
      return (
        <Tooltip title={t('home-page.icon-hint')}>
          <Icon className={styles.root} type="home" />
        </Tooltip>
      );

    if (isDefaultTemplatePage)
      return (
        <Tooltip title={t('default-product-list-page.icon-hint')}>
          <DefaultLayoutIcon className={styles.root} />
        </Tooltip>
      );

    return null;
  },
);
