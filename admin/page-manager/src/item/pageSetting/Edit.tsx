// typescript import
import { FormComponentProps } from 'antd/lib/form';

import { languageType } from '@meepshop/locales';

// import
import React from 'react';
import ReactDOM from 'react-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { Form, Input, Icon, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Tooltip from '@admin/tooltip';
import { usePortalTarget } from '@admin/hooks';
import {
  pageManagerPageTipPath_w200 as pageManagerPageTipPath,
  pageManagerPageTipTab_w200 as pageManagerPageTipTab,
} from '@meepshop/images';

import UploadImage from './UploadImage';
import useEditSubmit from './hooks/useEditSubmit';
import styles from './styles/edit.less';

// graphql typescript
import {
  editFragment as editFragmentType,
  checkIfPageExistsBeforeRenamingSeo as checkIfPageExistsBeforeRenamingSeoType,
  checkIfPageExistsBeforeRenamingSeoVariables,
  useRenamePageWithSEOCacheVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { checkIfPageExistsBeforeRenamingSeo } from './gqls/edit';

// typescript definition
interface PropsType extends FormComponentProps {
  offset: number;
  page: editFragmentType;
  variables: useRenamePageWithSEOCacheVariables;
  onClose: () => void;
}

// definition
const { Item: FormItem } = Form;

export default Form.create<PropsType>()(
  React.memo(
    ({
      // HOC
      form: { getFieldDecorator, validateFields, getFieldsError },

      // props
      offset,
      page: { id, title, pageType, path, tabTitle, seo },
      variables,
      onClose,
    }: PropsType) => {
      const client = useApolloClient();
      const portalTarget = usePortalTarget();
      const { t, i18n } = useTranslation('page-manager');
      const editSubmit = useEditSubmit(
        validateFields,
        id || 'id' /** SHOULD_NOT_BE_NULL */,
        pageType,
        variables,
        onClose,
      );

      return ReactDOM.createPortal(
        <Form
          className={styles.root}
          style={{ left: `${offset}px` }}
          onSubmit={editSubmit}
        >
          <div className={styles.title}>
            {t('page-setting.edit')}

            <Icon onClick={onClose} type="close" />
          </div>

          <div className={styles.form}>
            <FormItem>
              <span>
                {t('form.title.title')}

                <Tooltip title={t('form.title.hint')} />
              </span>

              {getFieldDecorator('title', {
                rules: [{ required: true, message: t('form.required') }],
                initialValue:
                  title?.[i18n.language as languageType] || title?.zh_TW,
              })(<Input placeholder={t('form.title.placeholder')} />)}
            </FormItem>

            {pageType !== 'custom' ? null : (
              <>
                <FormItem>
                  <span>
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
                          if (!value || value === path) return;

                          const { data } = await client.query<
                            checkIfPageExistsBeforeRenamingSeoType,
                            checkIfPageExistsBeforeRenamingSeoVariables
                          >({
                            query: checkIfPageExistsBeforeRenamingSeo,
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
                    initialValue: path,
                    validateTrigger: 'onBlur',
                  })(<Input placeholder={t('form.path.placeholder')} />)}
                </FormItem>

                <FormItem>
                  <span>
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
                    initialValue: tabTitle,
                  })(<Input placeholder={t('form.tabTitle.placeholder')} />)}
                </FormItem>
              </>
            )}

            {!['home', 'custom', 'products'].includes(
              pageType || '' /** SHOULD_NOT_BE_NULL */,
            ) ? null : (
              <div className={styles.seo}>
                <FormItem>
                  <span>
                    {t('form.keywords.title')}

                    <Tooltip title={t('form.keywords.hint')} />
                  </span>

                  {getFieldDecorator('keywords', {
                    initialValue: seo?.keywords,
                  })(<Input placeholder={t('form.keywords.placeholder')} />)}
                </FormItem>

                <FormItem>
                  <span>
                    {t('form.description.title')}

                    <Tooltip title={t('form.description.hint')} />
                  </span>

                  {getFieldDecorator('description', {
                    initialValue: seo?.description,
                  })(<Input placeholder={t('form.description.placeholder')} />)}
                </FormItem>

                <FormItem>
                  <span>
                    {t('form.image.title')}

                    <Tooltip title={t('form.image.hint')} />
                  </span>

                  {getFieldDecorator('image', {
                    initialValue: seo?.image,
                  })(<UploadImage />)}
                </FormItem>
              </div>
            )}

            <FormItem>
              <div />

              <div>
                <Button
                  disabled={(fieldsError =>
                    Object.keys(fieldsError).some(field => fieldsError[field]))(
                    getFieldsError(),
                  )}
                  type="primary"
                  htmlType="submit"
                >
                  {t('page-setting.save')}
                </Button>
              </div>
            </FormItem>
          </div>
        </Form>,
        portalTarget,
      );
    },
  ),
);
