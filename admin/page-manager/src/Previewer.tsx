// import
import React from 'react';
import gql from 'graphql-tag';
import { Spin, Button } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Link from '@meepshop/link';

import useIframeLoading from './hooks/useIframeLoading';
import styles from './styles/previewer.less';

// graphql typescript
import { localeFragmentType } from '@admin/utils/lib/fragments/locale';

import { previewerStoreFragment as previewerStoreFragmentType } from './__generated__/previewerStoreFragment';
import { previewerPageFragment as previewerPageFragmentType } from './__generated__/previewerPageFragment';

// graphql import
import localeFragment from '@admin/utils/lib/fragments/locale';

// typescript definition
interface PropsType {
  store: previewerStoreFragmentType;
  page: previewerPageFragmentType;
}

// definition
export const previewerStoreFragment = gql`
  fragment previewerStoreFragment on Store {
    id
    domain
    defaultDomain
  }
`;

export const previewerPageFragment = gql`
  fragment previewerPageFragment on Page {
    id
    title {
      ...localeFragment
    }
    pageType
    path
  }

  ${localeFragment}
`;

export default React.memo(
  ({
    store: { domain, defaultDomain },
    page: { id, title, pageType, path },
  }: PropsType) => {
    const { t, i18n } = useTranslation('page-manager');
    const { loading, scale, iframeRef, onLoad, iframeKey } = useIframeLoading(
      id,
    );

    return (
      <div className={styles.root}>
        <div className={styles.title}>
          {title?.[i18n.language as keyof localeFragmentType] || title?.zh_TW}
        </div>

        <Spin wrapperClassName={styles.iframe} spinning={loading}>
          <iframe
            key={iframeKey}
            ref={iframeRef}
            style={{
              transform: `scale(${scale})`,
              height: `${(1 / scale) * 100}%`,
            }}
            src={`/api/previewer/${domain?.[0] || defaultDomain}/${id}${
              pageType !== 'template' ? '' : '?pId=preview'
            }`}
            onLoad={onLoad}
            title="previewer"
          />
        </Spin>

        <div className={styles.buttons}>
          <Link href={`/page-manager/edit/${id}`}>
            <Button shape="round" type="primary" size="large">
              {t('edit')}
            </Button>
          </Link>

          {!['custom', 'products'].includes(
            pageType || '' /** TODO: should not be null */,
          ) ? null : (
            <a
              href={`//${domain?.[0] || defaultDomain}/${
                pageType === 'products' ? 'products' : `pages/${path}`
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button shape="round" size="large">
                {t('preview')}
              </Button>
            </a>
          )}
        </div>
      </div>
    );
  },
);
