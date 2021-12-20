// import
import React from 'react';
import { Button } from 'antd';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import { OpenNewPageIcon } from '@meepshop/icons';

import styles from './styles/header.less';

// graphql typescript
import { headerStoreFragment as headerStoreFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: headerStoreFragmentType;
}

// definition
export default React.memo(
  ({ store: { domain, defaultDomain, page } }: PropsType) => {
    const { t } = useTranslation('page-editor');
    const getLanguage = useGetLanguage();

    return (
      <div className={styles.root}>
        <div>
          <span>{`${t(`pageType.${page?.pageType}`)}/`}</span>
          <span>{getLanguage(page?.title)}</span>
        </div>

        <div>
          {!['custom', 'products'].includes(
            page?.pageType || '' /** SHOULD_NOT_BE_NULL */,
          ) ? null : (
            <a
              href={`//${domain?.[0] || defaultDomain}/${
                page?.pageType === 'products'
                  ? 'products'
                  : `pages/${page?.path}`
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button shape="circle" icon={<OpenNewPageIcon />} />
            </a>
          )}

          <Button type="primary">{t('save')}</Button>

          <Button>{t('quit')}</Button>
        </div>
      </div>
    );
  },
);
