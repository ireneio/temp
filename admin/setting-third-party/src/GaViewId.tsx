// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Divider, Form, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import styles from './styles/googleAnalytics.less';

// graphql typescript
import { gaViewIdFragment as gaViewIdFragmentType } from './__generated__/gaViewIdFragment';

// typescript definition
interface PropsType extends FormComponentProps {
  gaViewId: gaViewIdFragmentType['gaViewId'] | null;
}

// definition
const { Item: FormItem } = Form;

export const gaViewIdFragment = gql`
  fragment gaViewIdFragment on Store {
    gaViewId
  }
`;

export default React.memo(({ form, gaViewId }: PropsType) => {
  const { getFieldDecorator } = form;
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
                  rel="noreferrer"
                >
                  {t(`gaViewId.items.0.link`)}
                </a>
              </>
            }
            iconClassName={styles.tip}
          />
        </div>
        <div>meepshop-api@instant-matter-785.iam.gserviceaccount.com</div>
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
                  rel="noreferrer"
                >
                  {t(`gaViewId.items.1.link`)}
                </a>
              </>
            }
            iconClassName={styles.tip}
          />
        </div>

        <FormItem>
          {getFieldDecorator('gaViewId', {
            initialValue: gaViewId,
          })(<Input placeholder="View ID" />)}
        </FormItem>
        <div className={styles.caution}>{t(`gaViewId.items.1.caution`)}</div>
      </div>
    </>
  );
});
