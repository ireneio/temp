// import
import React from 'react';
import { Form, Divider, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/googleAnalytics.less';

// graphql typescript
import { gaViewIdFragment as gaViewIdFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  gaViewId: gaViewIdFragmentType['gaViewId'] | null;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ gaViewId }: PropsType) => {
  const { t } = useTranslation('setting-third-party');

  return (
    <>
      <div className={styles.item}>
        <div className={styles.title}>
          {t(`gaViewId.items.0.title`)}

          <Tooltip
            title={
              <>
                <div>{t(`gaViewId.items.0.tooltip`)}</div>
                <a
                  href="https://support.google.com/analytics/answer/1009702?hl=zh-Hant&ref_topic=6014099"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`gaViewId.items.0.link`)}
                </a>
              </>
            }
            iconClassName={styles.tip}
          />
        </div>

        <div>scm-processor@instant-matter-785.iam.gserviceaccount.com</div>
      </div>

      <Divider />

      <div className={styles.item}>
        <div className={styles.title}>
          {t(`gaViewId.items.1.title`)}

          <Tooltip
            title={
              <>
                <div>{t(`gaViewId.items.1.tooltip`)}</div>
                <a
                  href="https://support.google.com/analytics/answer/1009714"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`gaViewId.items.1.link`)}
                </a>
              </>
            }
            iconClassName={styles.tip}
          />
        </div>

        <FormItem name={['gaViewId']} initialValue={gaViewId}>
          <Input placeholder="View ID" />
        </FormItem>

        <div className={styles.caution}>{t(`gaViewId.items.1.caution`)}</div>
      </div>
    </>
  );
});
