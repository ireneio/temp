// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';
import { BaseButtonProps } from 'antd/lib/button/button';

// import
import React, { useState } from 'react';
import { Button, Modal, Input, Form, notification } from 'antd';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Tooltip from '@admin/tooltip';

import useCreateRoutingRule from './hooks/useCreateRoutingRule';
import useUpdateRoutingRule from './hooks/useUpdateRoutingRule';
import useValidator from './hooks/useValidator';
import formatUrl from './utils/formatUrl';
import styles from './styles/modal.less';

// graphql typescript
import {
  modalFragmet as modalFragmetType,
  modalFragmet_routingRules as modalFragmetRoutingRulesType,
} from './gqls/__generated__/modalFragmet';
import { useCreateRoutingRuleFragment as useCreateRoutingRuleFragmentType } from './gqls/__generated__/useCreateRoutingRuleFragment';

// graphql import
import { useCreateRoutingRuleFragment } from './gqls/useCreateRoutingRule';

// typesript definition
interface PropsType extends FormComponentProps, BaseButtonProps {
  user: modalFragmetType | null;
  editData?: modalFragmetRoutingRulesType | null;
}

// definition
const { Item: FormItem } = Form;

export default Form.create<PropsType>()(
  React.memo(({ user, editData, form, ...props }: PropsType) => {
    const {
      getFieldDecorator,
      getFieldValue,
      getFieldsError,
      validateFields,
      resetFields,
    } = form;
    const { t } = useTranslation('redirects');
    const [showModal, setShowModal] = useState<boolean>(false);

    const routingRules = user?.routingRules || [];
    const fromPath = getFieldValue('fromPath');
    const toPath = getFieldValue('toPath');
    const editId = editData?.id;
    const error = getFieldsError();

    const { validateFromPath, validateToPath } = useValidator(
      routingRules,
      editId,
      fromPath,
    );
    const createRoutingRule = useCreateRoutingRule({
      user: filter<useCreateRoutingRuleFragmentType>(
        useCreateRoutingRuleFragment,
        user,
      ),
      setShowModal,
      validateFields,
    });
    const updateRoutingRule = useUpdateRoutingRule({
      id: editId,
      setShowModal,
      validateFields,
    });

    return (
      <>
        <Button
          {...props}
          onClick={() => {
            if (!editId && routingRules.length >= 100) {
              return notification.error({
                message: t('actions.add-err-title'),
                description: t('actions.description'),
              });
            }
            return setShowModal(true);
          }}
        />
        <Modal
          destroyOnClose
          visible={showModal}
          title={!editId ? t('modal.add-title') : t('modal.edit-title')}
          maskClosable={false}
          onCancel={() => {
            resetFields();
            setShowModal(false);
          }}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                resetFields();
                setShowModal(false);
              }}
            >
              {t('modal.cancel')}
            </Button>,
            <Button
              key="submit"
              type="primary"
              disabled={
                !fromPath ||
                !toPath ||
                Object.keys(error).some(field => error[field])
              }
              onClick={!editId ? createRoutingRule : updateRoutingRule}
            >
              {!editId ? t('modal.save') : t('modal.save-change')}
            </Button>,
          ]}
        >
          <div className={styles.row}>
            <p>{t('originURL')}</p>
            <FormItem>
              {getFieldDecorator('fromPath', {
                initialValue: editData?.fromPath || '',
                validateTrigger: 'onBlur',
                validateFirst: true,
                rules: [
                  {
                    required: true,
                    message: t('required'),
                  },
                  {
                    validator: validateFromPath,
                  },
                ],
              })(
                <Input
                  placeholder={t('modal.placeholder')}
                  onBlur={e => {
                    e.target.value = formatUrl(e.target.value);
                  }}
                />,
              )}
            </FormItem>
          </div>
          <div className={styles.row}>
            <p>
              {t('redirectURL')}
              <Tooltip
                className={styles.tooltip}
                placement="top"
                title={t('tooltip')}
              />
            </p>
            <FormItem>
              {getFieldDecorator('toPath', {
                initialValue: editData?.toPath || '',
                validateTrigger: 'onBlur',
                validateFirst: true,
                rules: [
                  {
                    required: true,
                    message: t('required'),
                  },
                  {
                    validator: validateToPath,
                  },
                ],
              })(
                <Input
                  placeholder={t('modal.placeholder')}
                  onBlur={e => {
                    e.target.value = formatUrl(e.target.value);
                  }}
                />,
              )}
            </FormItem>
          </div>
          <div className={styles.pathPreview}>
            <p>{t('preview')}</p>
            <div>
              {user?.domain?.[0] || user?.defaultDomain}
              <span>{!toPath ? '/...' : toPath}</span>
            </div>
          </div>

          <div className={styles.description}>{t('preview-tip')}</div>
        </Modal>
      </>
    );
  }),
);
