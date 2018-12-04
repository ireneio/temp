import React from 'react';
import radium, { Style } from 'radium';
import PropTypes from 'prop-types';
import { Form, List, Input, Button, message } from 'antd';
import { subdirectoryArrowRight as ArrowRightIcon } from 'react-icons/md';
import { isFullWidth, isEmail } from 'validator';
import moment from 'moment';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, ISLOGIN_TYPE, COLOR_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import * as LOCALE from './locale';
import { GET_PRODUCT_QA_LIST, CREATE_PRODUCT_QA } from './constants';
import * as styles from './styles';

const { Item: FormItem } = Form;
const { Item: ListItem } = List;
const { Meta: ListItemMeta } = ListItem;
const { TextArea } = Input;

@enhancer
@Form.create()
@radium
export default class PrdoductQA extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,

    /** antd */
    form: PropTypes.shape({}).isRequired,

    /** props */
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

    const { getData, transformLocale, form, productId } = this.props;
    const { validateFields, resetFields } = form;

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
        } else {
          message.error(transformLocale(LOCALE.CAN_NOT_SEND));
        }
      }
    });
  };

  render() {
    const { isLogin, colors, transformLocale, form, productId } = this.props;
    const { QAList, showQAIndex } = this.state;
    const { getFieldDecorator, resetFields } = form;

    return (
      <Form className={`productQA-${productId}`} onSubmit={this.submit}>
        <Style
          scopeSelector={`.productQA-${productId}`}
          rules={styles.modifyAntdStyle(colors)}
        />

        <List
          locale={{ emptyText: '' }}
          itemLayout="horizontal"
          dataSource={QAList}
          renderItem={({ qa, userEmail }, index) => {
            const [{ question, createdOn }, replay] = qa;
            const [email] = (userEmail || '').split(/@/);

            return (
              <ListItem
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

                      {showQAIndex !== index ? null : (
                        <div style={styles.replayContent(colors)}>
                          <pre>{replay.question}</pre>(
                          {moment(replay.createdOn * 1000).format(
                            'YYYY/MM/DD HH:mm:ss',
                          )}
                          )
                        </div>
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
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
                {
                  validator: (rule, value, callback) => {
                    if (value && (isFullWidth(value) || !isEmail(value)))
                      callback(transformLocale(LOCALE.NOT_EMAIL));
                    else callback();
                  },
                },
              ],
            })(<Input placeholder={transformLocale(LOCALE.EMAIL)} />)}
          </FormItem>
        )}

        <FormItem>
          {getFieldDecorator('question', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.IS_REQUIRED),
              },
            ],
          })(
            <TextArea placeholder={transformLocale(LOCALE.CONTENT)} rows={4} />,
          )}
        </FormItem>

        <div style={styles.buttonRoot}>
          <Button
            style={styles.resetButton(colors)}
            onClick={() => resetFields()}
          >
            {transformLocale(LOCALE.RESET)}
          </Button>

          <Button style={styles.submitButton(colors)} htmlType="submit">
            {transformLocale(LOCALE.SUBMIT)}
          </Button>
        </div>
      </Form>
    );
  }
}
