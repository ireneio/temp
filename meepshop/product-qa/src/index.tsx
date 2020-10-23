// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useContext, useState } from 'react';
import { filter } from 'graphql-anywhere';
import moment from 'moment';
import transformColor from 'color';
import { isFullWidth, isEmail } from 'validator';
import { Form, Input, Button } from 'antd';

import { ViewReplyIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';

import useCreateProductQA from './hooks/useCreateProductQA';
import styles from './styles/index.less';

// graphql typescript
import { productQaProductQaModuleFragment } from './gqls/__generated__/productQaProductQaModuleFragment';
import { productQaUserFragment } from './gqls/__generated__/productQaUserFragment';

// graphql import
import { useCreateProductQAFragment } from './gqls/useCreateProductQA';

// typescript definition
export interface PropsType
  extends FormComponentProps,
    productQaProductQaModuleFragment {
  user: productQaUserFragment;
}

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;

export default Form.create<FormComponentProps>()(
  React.memo(
    ({
      width,
      product,
      user,
      form: { getFieldDecorator, resetFields, validateFields },
    }: PropsType) => {
      const { t } = useTranslation('product-qa');
      const colors = useContext(ColorsContext);
      const [showReplyQAIndex, setShowReplyQAIndex] = useState<number[]>([]);
      const createProductQA = useCreateProductQA(
        !product ? null : filter(useCreateProductQAFragment, product),
        resetFields,
      );

      return (
        <div className={styles.root} style={{ width: `${width}%` }}>
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
                    <pre>{question}</pre>

                    <div>
                      <div>
                        {`${email.length > 5 ? email.slice(0, 5) : email}*****`}
                      </div>

                      <div className={styles.createdAt}>
                        {moment(createdAt).format('YYYY/MM/DD HH:mm:ss')}
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
                              background: `${transformColor(colors[4]).alpha(
                                0.1,
                              )}`,
                            }}
                          >
                            <pre>{replyQa.question}</pre>
                            <div>
                              {`(${moment(replyQa.createdAt).format(
                                'YYYY/MM/DD HH:mm:ss',
                              )})`}
                            </div>
                          </div>
                        );
                      })}
                </div>
              );
            })}
          </div>

          {user.role !== 'SHOPPER' ? null : (
            <FormItem>
              {getFieldDecorator('userEmail', {
                rules: [
                  {
                    required: true,
                    message: t('is-required'),
                  },
                  {
                    validator: (_, value, callback) => {
                      if (value && (isFullWidth(value) || !isEmail(value)))
                        callback(t('not-email'));
                      else callback();
                    },
                  },
                ],
              })(
                <Input
                  style={{ borderColor: colors[5] }}
                  placeholder={t('email')}
                />,
              )}
            </FormItem>
          )}

          <FormItem>
            {getFieldDecorator('question', {
              rules: [
                {
                  required: true,
                  message: t('is-required'),
                },
              ],
            })(
              <TextArea
                style={{ borderColor: colors[5] }}
                placeholder={t('content')}
                rows={4}
              />,
            )}
          </FormItem>

          <div className={styles.button}>
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
              onClick={() => {
                validateFields((errors, { userEmail, question }) => {
                  if (!errors) {
                    createProductQA({
                      variables: {
                        createProductQA: [
                          {
                            productId: product?.id || 'null-id',
                            qa: [
                              {
                                question,
                              },
                            ],
                            ...(!userEmail ? {} : { userEmail }),
                          },
                        ],
                      },
                    });
                  }
                });
              }}
            >
              {t('submit')}
            </Button>
          </div>
        </div>
      );
    },
  ),
);
