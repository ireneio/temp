// typescript import
import { FormComponentProps } from 'antd/lib/form';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// import
import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
import { Form, Modal, Input, Switch, Icon } from 'antd';

import Tooltip from '@admin/tooltip';
import {
  pageManagerPageTipPath_w200 as pageManagerPageTipPath,
  pageManagerPageTipTab_w200 as pageManagerPageTipTab,
} from '@meepshop/images';

import ContainerSelect from './ContainerSelect';
import useModalSubmit from './hooks/useModalSubmit';
import styles from './styles/modal.less';

// graphql typescript
import {
  checkIfPageExistsBeforeCreatingPage,
  checkIfPageExistsBeforeCreatingPageVariables,
  getPagesVariables,
  usePagesPageFragment as usePagesPageFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  pageType: usePagesPageFragmentType['pageType'];
  variables: getPagesVariables;
  onClose: () => void;
}

// definition
const { Item: FormItem } = Form;
const query = gql`
  query checkIfPageExistsBeforeCreatingPage($input: String!) {
    isPagePathExists(pagePath: $input)
  }
`;

export default Form.create<PropsType>()(
  React.memo(
    ({
      // HOC
      form: { getFieldDecorator, validateFields, getFieldsError },

      // props
      pageType,
      variables,
      onClose,
    }: PropsType) => {
      const client = useApolloClient();
      const { t } = useTranslation('page-manager');
      const modalSubmit = useModalSubmit(validateFields, pageType, variables);
      const error = getFieldsError();

      return (
        <Modal
          style={{ top: '40px' }}
          wrapClassName={styles.root}
          title={`${t('add-new-page.add')}${t(`${pageType}-page.title`)}`}
          onOk={modalSubmit}
          okButtonProps={{
            disabled: Object.keys(error).some(field => error[field]),
          }}
          okText={t('add-new-page.add')}
          onCancel={onClose}
          cancelText={t('add-new-page.cancel')}
          width="530px"
          visible
        >
          <Form>
            <FormItem>
              <span className={styles.title}>{t('form.title.title')}</span>

              {getFieldDecorator('title', {
                rules: [{ required: true, message: t('form.required') }],
              })(<Input placeholder={t('form.title.placeholder')} />)}
            </FormItem>

            {pageType !== 'custom' ? null : (
              <>
                <FormItem>
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

                  {getFieldDecorator('path', {
                    rules: [
                      {
                        required: true,
                        message: t('form.required'),
                      },
                      {
                        validator: async (_, value) => {
                          if (!value) return;

                          const { data } = await client.query<
                            checkIfPageExistsBeforeCreatingPage,
                            checkIfPageExistsBeforeCreatingPageVariables
                          >({
                            query,
                            variables: {
                              input: value,
                            },
                          });

                          if (data?.isPagePathExists)
                            throw new Error(
                              t(
                                'rename-page-with-seo.error.FAIL_PAGE_PATH_DUPLICATE',
                              ),
                            );
                        },
                      },
                    ],
                  })(<Input placeholder={t('form.path.placeholder')} />)}
                </FormItem>

                <FormItem>
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

                  {getFieldDecorator('tabTitle', {
                    rules: [{ required: true, message: t('form.required') }],
                  })(<Input placeholder={t('form.tabTitle.placeholder')} />)}
                </FormItem>
              </>
            )}

            <FormItem>
              <span className={styles.title}>{t('form.templateType')}</span>

              {getFieldDecorator('templateType', {
                rules: [{ required: true, message: t('form.required') }],
                initialValue: 'DEFAULT',
              })(<ContainerSelect />)}
            </FormItem>

            <FormItem className={styles.switch}>
              {getFieldDecorator('useBottom', {
                rules: [{ required: true, message: t('form.required') }],
                initialValue: false,
                valuePropName: 'checked',
              })(<Switch />)}

              <span>{t('form.use-bottom')}</span>
            </FormItem>

            <div className={styles.notice}>{t('notice')}</div>

            {pageType !== 'template' ? null : (
              <div className={styles.templateCanNotDelete}>
                <Icon type="info-circle" />

                {t('template-can-not-delete')}
              </div>
            )}
          </Form>
        </Modal>
      );
    },
  ),
);
