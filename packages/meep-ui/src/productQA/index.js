import React from 'react';
import radium, { Style } from 'radium';
import PropTypes from 'prop-types';
import { Form, List, Input, Button, message } from 'antd';
import { MdSubdirectoryArrowRight as ArrowRightIcon } from 'react-icons/md';
import { isFullWidth, isEmail } from 'validator';
import moment from 'moment';

import { withTranslation } from '@meepshop/utils/lib/i18n';

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
    showQAIndex: -1,
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
      productId,
    } = this.props;
    const { QAList, showQAIndex } = this.state;

    return (
      <Form className={`productQA-${productId}`} onSubmit={this.submit}>
        <Style
          scopeSelector={`.productQA-${productId}`}
          rules={styles.modifyAntdStyle(colors)}
        />

        <List
          locale={{ emptyText: ' ' }}
          itemLayout="horizontal"
          dataSource={QAList}
          renderItem={({ qa, userEmail }, index) => {
            const [{ question, createdOn }, ...replay] = qa;
            const [email] = (userEmail || '').split(/@/);

            return (
              <ListItem
                style={{ flexWrap: 'wrap' }}
                extra={
                  qa.length === 1 ? null : (
                    <>
                      <div
                        style={styles.replay(colors)}
                        onClick={() =>
                          this.setState({
                            showQAIndex: showQAIndex === index ? -1 : index,
                          })
                        }
                      >
                        <ArrowRightIcon style={styles.arrowRightIcon} />
                        View Reply
                      </div>

                      {showQAIndex !== index
                        ? null
                        : replay.map(
                            ({
                              question: replayQuestion,
                              createdOn: replayCreatedOn,
                            }) => (
                              <div style={styles.replayContent(colors)}>
                                <pre>{replayQuestion}</pre>(
                                {moment(replayCreatedOn * 1000).format(
                                  'YYYY/MM/DD HH:mm:ss',
                                )}
                                )
                              </div>
                            ),
                          )}
                    </>
                  )
                }
                actions={[
                  `${email.length > 5 ? email.slice(0, 5) : email}*****`,
                  moment(createdOn * 1000).format('YYYY/MM/DD HH:mm:ss'),
                ]}
              >
                <ListItemMeta description={<pre>{question}</pre>} />
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
                  validator: (rule, value, callback) => {
                    if (value && (isFullWidth(value) || !isEmail(value)))
                      callback(t('not-email'));
                    else callback();
                  },
                },
              ],
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
