// import
import React from 'react';
import { Spin, Button } from 'antd';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import Link from '@meepshop/link';

import Instruction from './Instruction';
import useIframeLoading from './hooks/useIframeLoading';
import styles from './styles/previewer.less';

// graphql typescript
import {
  previewerStoreFragment as previewerStoreFragmentType,
  previewerPageFragment as previewerPageFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: previewerStoreFragmentType;
  page: previewerPageFragmentType;
}

// definition
export default React.memo(
  ({
    store: { domain, defaultDomain },
    page: { id, title, pageType, path },
  }: PropsType) => {
    const { t } = useTranslation('page-manager');
    const getLanguage = useGetLanguage();
    const { loading, scale, iframeRef, onLoad } = useIframeLoading(id);

    return (
      <div className={styles.root}>
        <div className={styles.title}>{getLanguage(title)}</div>

        <Spin wrapperClassName={styles.iframe} spinning={loading}>
          <iframe
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
            pageType || '' /** SHOULD_NOT_BE_NULL */,
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

        <Instruction />
      </div>
    );
  },
);
