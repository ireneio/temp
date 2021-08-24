import React from 'react';
import radium, { Style } from 'radium';
import PropTypes from 'prop-types';
import { Form, List, Input, Button, message } from 'antd';
import { format } from 'date-fns';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAutoLinker } from '@meepshop/hooks';
import { withTranslation } from '@meepshop/locales';
import { ViewReplyIcon } from '@meepshop/icons';
import { useValidateEmail } from '@meepshop/validator';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, ISLOGIN_TYPE, COLOR_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import { getProductQA, createProductQA } from './gqls';
import * as styles from './styles';

const { Item: FormItem } = Form;
const { Item: ListItem } = List;
const { Meta: ListItemMeta } = ListItem;
const { TextArea } = Input;

@enhancer
@withTranslation('product-qa')
@withHook(({ t, productId }) => {
  const [form] = Form.useForm();
  const { data } = useQuery(getProductQA, {
    variables: {
      productId,
    },
  });
  const qaList = data?.getProductQAList.data || [];
  const [mutation, { loading }] = useMutation(createProductQA, {
    update: (cache, { data: createProductQAData }) => {
      if (!createProductQAData) {
        message.error(t('can-not-send'));
        return;
      }

      cache.writeQuery({
        query: getProductQA,
        variables: {
          productId,
        },
        data: {
          ...data,
          getProductQAList: {
            ...data.getProductQAList,
            data: [
              ...createProductQAData.createProductQA,
              ...data.getProductQAList.data,
            ],
          },
        },
      });
      form.resetFields();
    },
  });

  return {
    qaList,
    mutation,
    form,
    loading,
    autoLinker: useAutoLinker(),
    validateEmail: useValidateEmail(),
  };
})
@radium
export default class PrdoductQA extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    productId: ID_TYPE.isRequired,
  };

  state = {
    showQAIndex: [],
  };

  finish = ({ userEmail, question }) => {
    const { productId, mutation } = this.props;

    mutation({
      variables: {
        createProductQA: {
          productId,
          qa: [
            {
              question,
            },
          ],
          ...(!userEmail ? {} : { userEmail }),
        },
      },
    });
  };

  render() {
    const {
      /** context */
      isLogin,
      colors,

      /** props */
      form,
      t,
      contentWidth,
      productId,
      validateEmail,
      autoLinker,
      qaList,
      loading,
    } = this.props;
    const { showQAIndex } = this.state;

    return (
      <Form
        className={`productQA-${productId}`}
        form={form}
        onFinish={this.finish}
      >
        <Style
          scopeSelector={`.productQA-${productId}`}
          rules={styles.modifyAntdStyle(colors, contentWidth)}
        />

        <List
          locale={{ emptyText: ' ' }}
          itemLayout="horizontal"
          dataSource={qaList}
          renderItem={({ qa, userEmail }, index) => {
            const [{ question, createdAt }, ...reply] = qa;
            const [email] = (userEmail || '').split(/@/);

            return (
              <ListItem
                style={{ flexWrap: 'wrap' }}
                extra={
                  qa.length === 1 ? null : (
                    <>
                      <div
                        style={styles.reply(colors)}
                        onClick={() =>
                          this.setState({
                            showQAIndex: showQAIndex.includes(index)
                              ? showQAIndex.filter(i => i !== index)
                              : [...showQAIndex, index],
                          })
                        }
                      >
                        <ViewReplyIcon />
                        {showQAIndex.includes(index)
                          ? t('hide-reply')
                          : t('view-reply')}
                      </div>

                      {!showQAIndex.includes(index)
                        ? null
                        : reply.map(
                            ({
                              question: replyQuestion,
                              createdAt: replyCreatedAt,
                            }) => (
                              <div style={styles.replyContent(colors)}>
                                <pre
                                  dangerouslySetInnerHTML={{
                                    __html: autoLinker.link(replyQuestion),
                                  }}
                                />
                                <div>
                                  {`(${format(
                                    new Date(replyCreatedAt),
                                    'yyyy/MM/dd HH:mm:ss',
                                  )})`}
                                </div>
                              </div>
                            ),
                          )}
                    </>
                  )
                }
                actions={[
                  `${email.length > 5 ? email.slice(0, 5) : email}*****`,
                  format(new Date(createdAt), 'yyyy/MM/dd HH:mm:ss'),
                ]}
              >
                <ListItemMeta
                  description={
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: autoLinker.link(question),
                      }}
                    />
                  }
                />
              </ListItem>
            );
          }}
        />

        {isLogin === ISUSER ? null : (
          <FormItem
            name={['userEmail']}
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
              {
                validator: validateEmail.validator,
              },
            ]}
            normalize={validateEmail.normalize}
          >
            <Input placeholder={t('email')} />
          </FormItem>
        )}

        <FormItem
          name={['question']}
          rules={[
            {
              required: true,
              message: t('is-required'),
            },
          ]}
        >
          <TextArea placeholder={t('content')} rows={4} />
        </FormItem>

        <div style={styles.buttonRoot}>
          <FormItem shouldUpdate noStyle>
            {({ resetFields }) => (
              <Button
                style={styles.resetButton(colors)}
                onClick={() => resetFields()}
              >
                {t('reset')}
              </Button>
            )}
          </FormItem>

          <Button
            style={styles.submitButton(colors)}
            loading={loading}
            htmlType="submit"
          >
            {t('submit')}
          </Button>
        </div>
      </Form>
    );
  }
}
