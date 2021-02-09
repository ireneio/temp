import React from 'react';
import radium, { Style } from 'radium';
import PropTypes from 'prop-types';
import { Form, List, Input, Button, message } from 'antd';
import moment from 'moment';

import { useAutoLinker } from '@meepshop/hooks';
import { withTranslation } from '@meepshop/utils/lib/i18n';
import { ViewReplyIcon } from '@meepshop/icons';
import { useValidateEmail } from '@meepshop/validator';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, ISLOGIN_TYPE, COLOR_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import { GET_PRODUCT_QA_LIST, CREATE_PRODUCT_QA } from './constants';
import * as styles from './styles';

const { Item: FormItem } = Form;
const { Item: ListItem } = List;
const { Meta: ListItemMeta } = ListItem;
const { TextArea } = Input;

@enhancer
@Form.create()
@withTranslation('product-qa')
@withHook(() => ({
  autoLinker: useAutoLinker(),
  validateEmail: useValidateEmail(),
}))
@radium
export default class PrdoductQA extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    getData: PropTypes.func.isRequired,

    /** antd */
    form: PropTypes.shape({}).isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    productId: ID_TYPE.isRequired,
  };

  state = {
    QAList: [],
    showQAIndex: [],
  };

  componentDidMount() {
    this.getQAList();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  getQAList = async () => {
    const { getData, productId } = this.props;

    const result = await getData(GET_PRODUCT_QA_LIST, {
      productId,
    });

    if (this.isUnmounted || !result?.data?.getProductQAList) return;

    this.setState({ QAList: result.data.getProductQAList.data });
  };

  submit = e => {
    e.preventDefault();

    const {
      /** context */
      getData,

      /** props */
      t,
      form: { validateFields, resetFields },
      productId,
    } = this.props;

    validateFields(async (err, { userEmail, question }) => {
      if (!err) {
        const { data: result } = await getData(CREATE_PRODUCT_QA, {
          createProductQA: {
            productId,
            qa: [
              {
                question,
              },
            ],
            ...(!userEmail ? {} : { userEmail }),
          },
        });

        if (result) {
          const { QAList } = this.state;

          resetFields();
          this.setState({ QAList: [...result.createProductQA, ...QAList] });
        } else message.error(t('can-not-send'));
      }
    });
  };

  render() {
    const {
      /** context */
      isLogin,
      colors,

      /** props */
      t,
      form: { getFieldDecorator, resetFields },
      contentWidth,
      productId,
      validateEmail,
      autoLinker,
    } = this.props;
    const { QAList, showQAIndex } = this.state;

    return (
      <Form className={`productQA-${productId}`} onSubmit={this.submit}>
        <Style
          scopeSelector={`.productQA-${productId}`}
          rules={styles.modifyAntdStyle(colors, contentWidth)}
        />

        <List
          locale={{ emptyText: ' ' }}
          itemLayout="horizontal"
          dataSource={QAList}
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
                                  {`(${moment(replyCreatedAt).format(
                                    'YYYY/MM/DD HH:mm:ss',
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
                  moment(createdAt).format('YYYY/MM/DD HH:mm:ss'),
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
          <FormItem>
            {getFieldDecorator('userEmail', {
              rules: [
                {
                  required: true,
                  message: t('is-required'),
                },
                {
                  validator: validateEmail.validator,
                },
              ],
              normalize: validateEmail.normalize,
            })(<Input placeholder={t('email')} />)}
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
          })(<TextArea placeholder={t('content')} rows={4} />)}
        </FormItem>

        <div style={styles.buttonRoot}>
          <Button
            style={styles.resetButton(colors)}
            onClick={() => resetFields()}
          >
            {t('reset')}
          </Button>

          <Button style={styles.submitButton(colors)} htmlType="submit">
            {t('submit')}
          </Button>
        </div>
      </Form>
    );
  }
}
