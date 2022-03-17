// typescript import
import { ImageNodeType } from '@admin/media-gallery';

// import
import React, { useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { Drawer, Form, Button, Input, Select } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { ContentUtils } from 'braft-utils';

import Gallery from '@admin/media-gallery';
import TextEditor, { createEditorState } from '@admin/text-editor';
import { usePortalTarget } from '@admin/hooks';
import { useTranslation } from '@meepshop/locales';

import useInitialValues from './hooks/useInitialValues';
import useSave from './hooks/useSave';
import styles from './styles/index.less';

// graphql typescript
import {
  getEdm as getEdmType,
  getEdmVariables as getEdmVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getEdm } from './gqls';
import { useInitialValuesNewsLetterFragment } from './gqls/useInitialValues';

// typescript definition
interface PropsType {
  id: string;
  onClose: () => void;
}

// definition
const { Item: FormItem } = Form;
const { Option } = Select;

export default React.memo(({ id, onClose }: PropsType) => {
  const { t } = useTranslation('newsletter');
  const [form] = Form.useForm();
  const [openGallery, setOpenGallery] = useState<boolean>(false);
  const portalTarget = usePortalTarget();
  const isNew = useMemo(() => id === 'undefined', [id]);
  const { data } = useQuery<getEdmType, getEdmVariablesType>(getEdm, {
    variables: { isNew, id },
  });
  const initialValues = useInitialValues(
    filter(
      useInitialValuesNewsLetterFragment,
      data?.viewer?.store?.edm || null,
    ),
  );
  const { loading, save } = useSave(id, isNew);

  const setImages = useCallback(
    node => {
      const { getFieldValue, setFieldsValue } = form;

      const images = node.map((image: ImageNodeType) => ({
        type: 'IMAGE',
        url: image.scaledSrc?.w1200,
      }));

      setFieldsValue({
        template: ContentUtils.insertMedias(
          createEditorState(getFieldValue('template')),
          images,
        ),
      });
      setOpenGallery(false);
    },
    [form],
  );

  const status = data?.viewer?.store?.edm?.status || 0;
  const memberGroups = [
    { id: 'all-total-member', name: t('all-members') },
    ...(data?.viewer?.store?.memberGroups || []).filter(
      group => group.id && group.status !== -1,
    ),
  ];
  const title = status === 0 ? t('draft') : t('sent-newsletter');
  const disabled = !isNew && status > 0;

  return (
    <Form form={form} initialValues={initialValues} onFinish={save}>
      <Drawer
        className={styles.root}
        width={800}
        visible
        destroyOnClose
        closable={false}
        onClose={onClose}
        title={
          <>
            <div>{!isNew ? title : t('new-newsletter')}</div>

            <div>
              <Button onClick={onClose}>{t('back')}</Button>

              <FormItem dependencies={['subject']} noStyle>
                {({ getFieldValue, setFieldsValue, submit }) =>
                  !getFieldValue(['subject']) || status ? null : (
                    <>
                      <Button loading={loading} onClick={submit}>
                        {t('save-draft')}
                      </Button>

                      <Button
                        loading={loading}
                        onClick={() => {
                          setFieldsValue({ sendNow: true });
                          submit();
                        }}
                        type="primary"
                      >
                        {t('send')}
                      </Button>
                    </>
                  )
                }
              </FormItem>
            </div>
          </>
        }
      >
        <div className={styles.info}>
          <div>{t('info')}</div>

          <FormItem name={['sendNow']} noStyle>
            <Input type="hidden" />
          </FormItem>

          <div>
            <FormItem
              name={['subject']}
              rules={[
                {
                  required: true,
                  message: t('required'),
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input placeholder={t('subject')} disabled={disabled} />
            </FormItem>

            <FormItem name={['groupId']}>
              <Select placeholder={t('recipient')} disabled={disabled}>
                {memberGroups.map(({ id: groupId, name }) => (
                  <Option key={groupId as string} value={groupId as string}>
                    {name}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </div>
        </div>

        <FormItem name={['template']}>
          <TextEditor
            className={styles.textEditor}
            extendControls={[
              {
                key: 'gallery',
                type: 'button',
                text: <PictureOutlined />,
                onClick: () => setOpenGallery(true),
              },
            ]}
          />
        </FormItem>

        {!openGallery
          ? null
          : ReactDOM.createPortal(
              <div className={styles.gallery}>
                <Gallery
                  multiple
                  buttons={
                    <Button onClick={() => setOpenGallery(false)}>
                      {t('back')}
                    </Button>
                  }
                  buttonText={t('selected')}
                  onChange={setImages}
                />
              </div>,
              portalTarget as HTMLDivElement,
            )}
      </Drawer>
    </Form>
  );
});
