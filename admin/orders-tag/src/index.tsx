// import
import React, { useCallback } from 'react';
import { Drawer, Button, Tag, Form } from 'antd';

import { useTranslation } from '@meepshop/locales';

import TagsSelect from './TagsSelect';
import useTagsHooks from './hooks/useTagsHooks';
import useValidator from './hooks/useValidator';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  orderIds: string[];
  onClose: () => void;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ orderIds, onClose }: PropsType) => {
  const { t } = useTranslation('orders-tag');
  const [form] = Form.useForm();
  const { resetFields, submit } = form;
  const {
    tags,
    options,
    ableToSaveTags,
    addTag,
    refetch,
    removeTag,
    saveTags,
  } = useTagsHooks(orderIds, resetFields, onClose);
  const validator = useValidator(tags);

  const handleSelect = useCallback(() => {
    submit();
    refetch({
      input: {
        orderIds,
      },
    });
  }, [orderIds, refetch, submit]);

  return (
    <Drawer
      destroyOnClose
      className={styles.root}
      visible
      closable={false}
      width={600}
      onClose={onClose}
      title={
        <>
          <h1>{t('title')}</h1>
          <div>
            <Button onClick={onClose}>{t('back')}</Button>
            {ableToSaveTags ? null : (
              <Button type="primary" onClick={saveTags}>
                {t('save')}
              </Button>
            )}
          </div>
        </>
      }
    >
      <Form form={form} onFinish={addTag}>
        <h2 className={styles.title}>{t('tag')}</h2>

        <FormItem
          name={['tag']}
          rules={[
            {
              validator,
            },
          ]}
          validateTrigger="onBlur"
        >
          <TagsSelect
            orderIds={orderIds}
            options={options}
            onSelect={handleSelect}
            refetch={refetch}
          />
        </FormItem>

        <div className={styles.tagWrap}>
          {tags.map(tag => (
            <Tag
              key={tag.id}
              className={styles.tag}
              closable
              onClose={() => removeTag(tag)}
            >
              {tag.value}
            </Tag>
          ))}
        </div>
      </Form>
    </Drawer>
  );
});
