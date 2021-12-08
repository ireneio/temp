// typescript import
import { QueryResult } from '@apollo/client';

// import
import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Button, Input, Switch } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Tooltip from '@admin/tooltip';
import {
  pageManagerPageTipPath_w200 as pageManagerPageTipPath,
  pageManagerPageTipTab_w200 as pageManagerPageTipTab,
} from '@meepshop/images';
import { useValidatePagePath } from '@meepshop/validator';

import ContainerSelect from './ContainerSelect';
import useCreatePage from './hooks/useCreatePage';
import styles from './styles/modal.less';

// graphql typescript
import {
  getPages,
  getPagesVariables,
  usePagesPageFragment as usePagesPageFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType
  extends Pick<QueryResult<getPages, getPagesVariables>, 'variables'> {
  pageType: usePagesPageFragmentType['pageType'];
  onClose: () => void;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ pageType, variables, onClose }: PropsType) => {
  const { t } = useTranslation('page-manager');
  const validatePagePath = useValidatePagePath();
  const createPage = useCreatePage(pageType, variables);

  return (
    <Form onFinish={createPage}>
      <Modal
        style={{ top: '40px' }}
        wrapClassName={styles.root}
        title={`${t('add-new-page.add')}${t(`${pageType}-page.title`)}`}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            {t('add-new-page.cancel')}
          </Button>,

          <FormItem key="submit" shouldUpdate noStyle>
            {({ getFieldsError, submit }) => (
              <Button
                disabled={getFieldsError().some(
                  ({ errors }) => errors.length !== 0,
                )}
                onClick={submit}
                type="primary"
              >
                {t('add-new-page.add')}
              </Button>
            )}
          </FormItem>,
        ]}
        width="530px"
        visible
      >
        <span className={styles.title}>{t('form.title.title')}</span>

        <FormItem
          name={['title']}
          rules={[{ required: true, message: t('form.required') }]}
        >
          <Input placeholder={t('form.title.placeholder')} />
        </FormItem>

        {pageType !== 'custom' ? null : (
          <>
            <span className={styles.title}>
              {t('form.path.title')}

              <Tooltip
                title={
                  <img
                    className={styles.tooltip}
                    src={pageManagerPageTipPath}
                    alt="pageManagerPageTipPath"
                  />
                }
              />
            </span>

            <FormItem
              name={['path']}
              rules={[
                {
                  required: true,
                  message: t('form.required'),
                },
                {
                  validator: validatePagePath,
                },
              ]}
            >
              <Input placeholder={t('form.path.placeholder')} />
            </FormItem>

            <span className={styles.title}>
              {t('form.tabTitle.title')}

              <Tooltip
                title={
                  <img
                    className={styles.tooltip}
                    src={pageManagerPageTipTab}
                    alt="pageManagerPageTipTab"
                  />
                }
              />
            </span>

            <FormItem
              name={['tabTitle']}
              rules={[{ required: true, message: t('form.required') }]}
            >
              <Input placeholder={t('form.tabTitle.placeholder')} />
            </FormItem>
          </>
        )}

        <span className={styles.title}>{t('form.templateType')}</span>

        <FormItem
          name={['templateType']}
          rules={[{ required: true, message: t('form.required') }]}
          initialValue="DEFAULT"
        >
          <ContainerSelect />
        </FormItem>

        <div className={styles.switch}>
          <FormItem
            className={styles.switch}
            name={['useBottom']}
            rules={[{ required: true, message: t('form.required') }]}
            initialValue={false}
            valuePropName="checked"
          >
            <Switch />
          </FormItem>

          <span>{t('form.use-bottom')}</span>
        </div>

        <div className={styles.notice}>{t('notice')}</div>

        {pageType !== 'template' ? null : (
          <div className={styles.templateCanNotDelete}>
            <InfoCircleOutlined />

            {t('template-can-not-delete')}
          </div>
        )}
      </Modal>
    </Form>
  );
});
