// typescript import
import { QueryResult } from '@apollo/client';

import { languageType } from '@meepshop/locales';

// import
import React from 'react';
import ReactDOM from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Tooltip from '@admin/tooltip';
import { usePortalTarget } from '@admin/hooks';
import {
  pageManagerPageTipPath_w200 as pageManagerPageTipPath,
  pageManagerPageTipTab_w200 as pageManagerPageTipTab,
} from '@meepshop/images';
import { useValidatePagePath } from '@meepshop/validator';

import UploadImage from './UploadImage';
import useRenamePageWithSEO from './hooks/useRenamePageWithSEO';
import styles from './styles/edit.less';

// graphql typescript
import {
  editFragment as editFragmentType,
  useRenamePageWithSEOCache,
  useRenamePageWithSEOCacheVariables,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType
  extends Pick<
    QueryResult<useRenamePageWithSEOCache, useRenamePageWithSEOCacheVariables>,
    'variables'
  > {
  offset: number;
  page: editFragmentType;
  onClose: () => void;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({
    offset,
    page: { id, title, pageType, path, tabTitle, seo },
    variables,
    onClose,
  }: PropsType) => {
    const portalTarget = usePortalTarget();
    const validatePagePath = useValidatePagePath(path);
    const { t, i18n } = useTranslation('page-manager');
    const renamePageWithSEO = useRenamePageWithSEO(
      id || 'id' /* SHOULD_NOT_BE_NULL */,
      pageType,
      variables,
      onClose,
    );

    return ReactDOM.createPortal(
      <Form
        className={styles.root}
        style={{ left: `${offset}px` }}
        onFinish={renamePageWithSEO}
      >
        <div className={styles.title}>
          {t('page-setting.edit')}

          <CloseOutlined onClick={onClose} />
        </div>

        <div className={styles.form}>
          <div className={styles.formItem}>
            <span>
              {t('form.title.title')}

              <Tooltip title={t('form.title.hint')} />
            </span>

            <FormItem
              name={['title']}
              rules={[{ required: true, message: t('form.required') }]}
              initialValue={
                title?.[i18n.language as languageType] || title?.zh_TW
              }
            >
              <Input placeholder={t('form.title.placeholder')} />
            </FormItem>
          </div>

          {pageType !== 'custom' ? null : (
            <>
              <div className={styles.formItem}>
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
                  initialValue={path}
                  validateTrigger="onBlur"
                >
                  <Input placeholder={t('form.path.placeholder')} />
                </FormItem>
              </div>

              <div className={styles.formItem}>
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

                <FormItem
                  name={['tabTitle']}
                  rules={[{ required: true, message: t('form.required') }]}
                  initialValue={tabTitle}
                >
                  <Input placeholder={t('form.tabTitle.placeholder')} />
                </FormItem>
              </div>
            </>
          )}

          {!['home', 'custom', 'products'].includes(
            pageType || '' /** SHOULD_NOT_BE_NULL */,
          ) ? null : (
            <>
              <div className={styles.border} />

              <div className={styles.formItem}>
                <span>
                  {t('form.keywords.title')}

                  <Tooltip title={t('form.keywords.hint')} />
                </span>

                <FormItem
                  name={['seo', 'keywords']}
                  initialValue={seo?.keywords}
                >
                  <Input placeholder={t('form.keywords.placeholder')} />
                </FormItem>
              </div>

              <div className={styles.formItem}>
                <span>
                  {t('form.description.title')}

                  <Tooltip title={t('form.description.hint')} />
                </span>

                <FormItem
                  name={['seo', 'description']}
                  initialValue={seo?.description}
                >
                  <Input placeholder={t('form.description.placeholder')} />
                </FormItem>
              </div>

              <div className={styles.formItem}>
                <span>
                  {t('form.image.title')}

                  <Tooltip title={t('form.image.hint')} />
                </span>

                <FormItem name={['seo', 'image']} initialValue={seo?.image}>
                  <UploadImage />
                </FormItem>
              </div>
            </>
          )}

          <div className={styles.formItem}>
            <div />

            <div>
              <FormItem shouldUpdate noStyle>
                {({ getFieldsError }) => (
                  <Button
                    disabled={getFieldsError().some(
                      ({ errors }) => errors.length !== 0,
                    )}
                    type="primary"
                    htmlType="submit"
                  >
                    {t('page-setting.save')}
                  </Button>
                )}
              </FormItem>
            </div>
          </div>
        </div>
      </Form>,
      portalTarget as HTMLDivElement,
    );
  },
);
