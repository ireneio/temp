// import
import React, { useContext, useState } from 'react';
import { format } from 'date-fns';
import transformColor from 'color';
import { Form, Input, Button } from 'antd';

import Email from '@meepshop/form-email';
import { useAutoLinker } from '@meepshop/hooks';
import { ViewReplyIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import useCreateProductQA from './hooks/useCreateProductQA';
import styles from './styles/index.less';

// graphql typescript
import { productQaFragment } from '@meepshop/types/gqls/meepshop';

// graphql import
import { useCreateProductQAFragment } from './gqls/useCreateProductQA';

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;

export default React.memo(({ width, product, viewer }: productQaFragment) => {
  const { t } = useTranslation('product-qa');
  const colors = useContext(ColorsContext);
  const [showReplyQAIndex, setShowReplyQAIndex] = useState<number[]>([]);
  const [form] = Form.useForm();
  const createProductQA = useCreateProductQA(
    filter(useCreateProductQAFragment, product),
    form,
  );
  const autoLinker = useAutoLinker();

  return (
    <Form
      className={styles.root}
      style={{ width: `${width}%` }}
      form={form}
      onFinish={createProductQA}
    >
      <div className={styles.qa}>
        {product?.publicViewableQas?.map((productQa, index) => {
          if (!productQa?.qa) return null;

          const { qa, userEmail } = productQa;

          if (!qa?.[0]) return null;

          const [{ question, createdAt, id }, ...reply] = qa;
          const [email] = (userEmail || '').split(/@/);

          return (
            <div key={id} style={{ borderColor: colors[3] }}>
              <div className={styles.question}>
                <pre
                  dangerouslySetInnerHTML={{
                    __html: autoLinker.link(question || ''),
                  }}
                />

                <div>
                  <div>
                    {`${email.length > 5 ? email.slice(0, 5) : email}*****`}
                  </div>

                  <div className={styles.createdAt}>
                    {format(
                      new Date(createdAt || new Date()),
                      'yyyy/MM/dd HH:mm:ss',
                    )}
                  </div>
                </div>
              </div>

              {qa.length === 1 ? null : (
                <div
                  className={styles.viewReplyButton}
                  style={{ color: colors[4] }}
                  onClick={() =>
                    setShowReplyQAIndex(
                      showReplyQAIndex.includes(index)
                        ? showReplyQAIndex.filter(i => i !== index)
                        : [...showReplyQAIndex, index],
                    )
                  }
                >
                  <ViewReplyIcon />
                  {showReplyQAIndex.includes(index)
                    ? t('hide-reply')
                    : t('view-reply')}
                </div>
              )}

              {!showReplyQAIndex.includes(index)
                ? null
                : reply.map(replyQa => {
                    if (!replyQa) return null;

                    return (
                      <div
                        key={replyQa.id}
                        className={styles.reply}
                        style={{
                          background: `${transformColor(colors[4]).alpha(0.1)}`,
                        }}
                      >
                        <pre
                          dangerouslySetInnerHTML={{
                            __html: autoLinker.link(replyQa.question || ''),
                          }}
                        />
                        <div>
                          {`(${format(
                            new Date(replyQa.createdAt || new Date()),
                            'yyyy/MM/dd HH:mm:ss',
                          )})`}
                        </div>
                      </div>
                    );
                  })}
            </div>
          );
        })}
      </div>

      {viewer?.role === 'SHOPPER' ? null : <Email name={['userEmail']} />}

      <FormItem
        name={['question']}
        rules={[
          {
            required: true,
            message: t('is-required'),
          },
        ]}
      >
        <TextArea
          style={{ borderColor: colors[5] }}
          placeholder={t('content')}
          rows={4}
        />
      </FormItem>

      <div className={styles.button}>
        <FormItem shouldUpdate noStyle>
          {({ resetFields, getFieldsError }) => (
            <>
              <Button
                style={{
                  color: colors[4],
                  borderColor: colors[4],
                }}
                onClick={() => resetFields()}
              >
                {t('reset')}
              </Button>

              <Button
                style={{
                  color: colors[2],
                  borderColor: colors[4],
                  backgroundColor: colors[4],
                }}
                disabled={getFieldsError().some(
                  ({ errors }) => errors.length !== 0,
                )}
                htmlType="submit"
              >
                {t('submit')}
              </Button>
            </>
          )}
        </FormItem>
      </div>
    </Form>
  );
});
