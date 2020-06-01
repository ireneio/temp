// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
import { Form, Input, Icon, Button, Tooltip } from 'antd';

import { useTranslation } from '@admin/utils/lib/i18n';
import usePortalTarget from '@admin/utils/lib/hooks/usePortalTarget';
import ImagesContext, {
  pageManagerPageTipPath_w200 as pageManagerPageTipPath,
  pageManagerPageTipTab_w200 as pageManagerPageTipTab,
} from '@meepshop/images';

import UploadImage from './UploadImage';
import useEditSubmit from './hooks/useEditSubmit';
import styles from './styles/edit.less';

// graphql typescript
import { localeFragmentType } from '@admin/utils/lib/fragments/locale';

import { editFragment as editFragmentType } from './__generated__/editFragment';
import {
  checkIfPageExistsBeforeRenamingSeo,
  checkIfPageExistsBeforeRenamingSeoVariables,
} from './__generated__/checkIfPageExistsBeforeRenamingSeo';
import { useRenamePageWithSEOCacheVariables } from './hooks/__generated__/useRenamePageWithSEOCache';

// graphql import
import localeFragment from '@admin/utils/lib/fragments/locale';

// typescript definition
interface PropsType extends FormComponentProps {
  offset: number;
  page: editFragmentType;
  variables: useRenamePageWithSEOCacheVariables;
  onClose: () => void;
}

// definition
export const editFragment = gql`
  fragment editFragment on Page {
    id
    title {
      ...localeFragment
    }
    pageType
    path
    addressTitle
    seo {
      keywords
      description
      image
    }
  }

  ${localeFragment}
`;

const query = gql`
  query checkIfPageExistsBeforeRenamingSeo($input: String!) {
    isPagePathExists(pagePath: $input)
  }
`;

const { Item: FormItem } = Form;

export default Form.create<PropsType>()(
  React.memo(
    ({
      // HOC
      form: { getFieldDecorator, validateFields, getFieldsError },

      // props
      offset,
      page: { id, title, pageType, path, addressTitle, seo },
      variables,
      onClose,
    }: PropsType) => {
      const client = useApolloClient();
      const portalTarget = usePortalTarget();
      const { t, i18n } = useTranslation('page-manager');
      const getUrl = useContext(ImagesContext);
      const editSubmit = useEditSubmit(
        validateFields,
        id || 'id' /** TODO should not be null */,
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

                <Tooltip title={t('form.title.hint')}>
                  <Icon type="question-circle" theme="filled" />
                </Tooltip>
              </span>

              {getFieldDecorator('title', {
                rules: [{ required: true, message: t('form.required') }],
                initialValue:
                  title?.[i18n.language as keyof localeFragmentType] ||
                  title?.zh_TW,
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
                          src={getUrl(pageManagerPageTipPath)}
                          alt="pageManagerPageTipPath"
                        />
                      }
                    >
                      <Icon type="question-circle" theme="filled" />
                    </Tooltip>
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
                            checkIfPageExistsBeforeRenamingSeo,
                            checkIfPageExistsBeforeRenamingSeoVariables
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
                          src={getUrl(pageManagerPageTipTab)}
                          alt="pageManagerPageTipTab"
                        />
                      }
                    >
                      <Icon type="question-circle" theme="filled" />
                    </Tooltip>
                  </span>

                  {getFieldDecorator('tabTitle', {
                    rules: [{ required: true, message: t('form.required') }],
                    initialValue: addressTitle,
                  })(<Input placeholder={t('form.tabTitle.placeholder')} />)}
                </FormItem>
              </>
            )}

            {!['home', 'custom', 'products'].includes(
              pageType || '' /** TODO should noe be null */,
            ) ? null : (
              <div className={styles.seo}>
                <FormItem>
                  <span>
                    {t('form.keywords.title')}

                    <Tooltip title={t('form.keywords.hint')}>
                      <Icon type="question-circle" theme="filled" />
                    </Tooltip>
                  </span>

                  {getFieldDecorator('keywords', {
                    initialValue: seo?.keywords,
                  })(<Input placeholder={t('form.keywords.placeholder')} />)}
                </FormItem>

                <FormItem>
                  <span>
                    {t('form.description.title')}

                    <Tooltip title={t('form.description.hint')}>
                      <Icon type="question-circle" theme="filled" />
                    </Tooltip>
                  </span>

                  {getFieldDecorator('description', {
                    initialValue: seo?.description,
                  })(<Input placeholder={t('form.description.placeholder')} />)}
                </FormItem>

                <FormItem>
                  <span>
                    {t('form.image.title')}

                    <Tooltip title={t('form.image.hint')}>
                      <Icon type="question-circle" theme="filled" />
                    </Tooltip>
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
