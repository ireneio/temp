// import
import React, { useState } from 'react';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Button, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import { webTrackGoogleTagManager_w172 as webTrackGoogleTagManager } from '@meepshop/images';
import Link from '@meepshop/link';

import useUpdateGoogleTagManager from './hooks/useUpdateGoogleTagManager';
import useValidateGoogleTagManager from './hooks/useValidateGoogleTagManager';
import styles from './styles/googleTagManager.less';

// graphql typescript
import { googleTagManagerFragment as googleTagManagerFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: googleTagManagerFragmentType;
}

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;

export default React.memo(({ store }: PropsType) => {
  const {
    id,
    adTracks: { googleTagManager },
  } = store;
  const { t } = useTranslation('web-track');
  const [editMode, setEditMode] = useState(false);
  const validateGoogleTagManager = useValidateGoogleTagManager();
  const updateGoogleTagManager = useUpdateGoogleTagManager(id, setEditMode);

  return (
    <div>
      <img src={webTrackGoogleTagManager} alt="GoogleTagManager" />

      <div className={styles.title}>
        <div>{t('google-tag-manager.title')}</div>

        <Tooltip
          arrowPointAtCenter
          placement="top"
          onlyLink
          title={
            <Link
              href="https://supportmeepshop.com/knowledgebase/google-tag-manager標記管理工具/"
              target="_blank"
            >
              <a href="https://supportmeepshop.com/knowledgebase/google-tag-manager標記管理工具/">
                {t(`google-tag-manager.tip`)}
              </a>
            </Link>
          }
        />
      </div>

      <div className={styles.description}>
        {t('google-tag-manager.description')}
      </div>

      <div className={styles.warning}>
        <ExclamationCircleOutlined />

        {t('google-tag-manager.warning')}
      </div>

      {editMode ? (
        <Form className={styles.edit} onFinish={updateGoogleTagManager}>
          {t('google-tag-manager.googleTagManager')}

          <FormItem
            name={['googleTagManager']}
            initialValue={googleTagManager}
            rules={[
              {
                validator: validateGoogleTagManager,
              },
            ]}
          >
            <TextArea
              placeholder={t('google-tag-manager.setting-placeholder')}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
          </FormItem>

          <Button type="primary" htmlType="submit">
            {t('save')}
          </Button>

          <Button onClick={() => setEditMode(false)}>{t('cancel')}</Button>
        </Form>
      ) : (
        <>
          {googleTagManager ? (
            <div className={styles.googleTagManager}>
              <div>
                {t('google-tag-manager.googleTagManager')}

                <EditOutlined onClick={() => setEditMode(true)} />
              </div>

              <div>{googleTagManager}</div>
            </div>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              {t('google-tag-manager.setting')}
            </Button>
          )}
        </>
      )}
    </div>
  );
});
