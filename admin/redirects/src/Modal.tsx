// typescript import
import { BaseButtonProps } from 'antd/lib/button/button';

// import
import React, { useState } from 'react';
import { Form, Button, Modal, notification } from 'antd';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';
import Tooltip from '@admin/tooltip';

import UrlInput from './UrlInput';
import useCreateRoutingRule from './hooks/useCreateRoutingRule';
import useUpdateRoutingRule from './hooks/useUpdateRoutingRule';
import useValidator from './hooks/useValidator';
import styles from './styles/modal.less';

// graphql typescript
import {
  modalFragmet as modalFragmetType,
  modalFragmet_routingRules as modalFragmetRoutingRulesType,
  useCreateRoutingRuleFragment as useCreateRoutingRuleFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { useCreateRoutingRuleFragment } from './gqls/useCreateRoutingRule';

// typesript definition
interface PropsType extends BaseButtonProps {
  user: modalFragmetType | null;
  editData?: modalFragmetRoutingRulesType | null;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ user, editData, ...props }: PropsType) => {
  const { t } = useTranslation('redirects');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { resetFields } = form;
  const routingRules = user?.routingRules || [];
  const editId = editData?.id;
  const { validateFromPath, validateToPath } = useValidator(
    routingRules,
    editId,
  );
  const createRoutingRule = useCreateRoutingRule({
    user: filter<useCreateRoutingRuleFragmentType>(
      useCreateRoutingRuleFragment,
      user,
    ),
    setShowModal,
  });
  const updateRoutingRule = useUpdateRoutingRule({
    id: editId,
    setShowModal,
  });

  return (
    <Form
      form={form}
      onFinish={!editId ? createRoutingRule : updateRoutingRule}
    >
      <Button
        {...props}
        onClick={() => {
          if (!editId && routingRules.length >= 100)
            notification.error({
              message: t('actions.add-err-title'),
              description: t('actions.description'),
            });
          else setShowModal(true);
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

          <FormItem key="submit" shouldUpdate noStyle>
            {({ submit, getFieldValue, getFieldsError }) => (
              <Button
                onClick={submit}
                disabled={
                  !getFieldValue(['fromPath']) ||
                  !getFieldValue(['toPath']) ||
                  getFieldsError().some(({ errors }) => errors.length !== 0)
                }
                type="primary"
              >
                {!editId ? t('modal.save') : t('modal.save-change')}
              </Button>
            )}
          </FormItem>,
        ]}
      >
        <div className={styles.row}>
          <p>{t('originURL')}</p>

          <FormItem
            name={['fromPath']}
            initialValue={editData?.fromPath || ''}
            rules={[
              {
                required: true,
                message: t('required'),
              },
              {
                validator: validateFromPath,
              },
            ]}
            validateTrigger="onBlur"
            validateFirst
          >
            <UrlInput placeholder={t('modal.placeholder')} />
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

          <FormItem
            name={['toPath']}
            dependencies={['fromPath']}
            initialValue={editData?.toPath || ''}
            rules={[
              {
                required: true,
                message: t('required'),
              },
              validateToPath,
            ]}
            validateTrigger="onBlur"
            validateFirst
          >
            <UrlInput placeholder={t('modal.placeholder')} />
          </FormItem>
        </div>
        <div className={styles.pathPreview}>
          <p>{t('preview')}</p>

          <div>
            {user?.domain?.[0] || user?.defaultDomain}

            <FormItem dependencies={['toPath']} noStyle>
              {({ getFieldValue }) => {
                const toPath = getFieldValue(['toPath']);

                return <span>{!toPath ? '/...' : toPath}</span>;
              }}
            </FormItem>
          </div>
        </div>

        <div className={styles.description}>{t('preview-tip')}</div>
      </Modal>
    </Form>
  );
});
