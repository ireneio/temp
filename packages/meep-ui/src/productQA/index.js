import React from 'react';
import radium, { Style } from 'radium';
import PropTypes from 'prop-types';
import { Form, List, Input, Button, message } from 'antd';
import { subdirectoryArrowRight as ArrowRightIcon } from 'react-icons/md';
import moment from 'moment';

import { enhancer } from 'layout';
import { ID_TYPE, ISLOGIN_TYPE, COLOR_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import * as LOCALE from './locale';
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

  getQAList = async () => {
    const { getData, productId } = this.props;

    const { data: result } = await getData(`
      query {
        getProductQAList(search: {
          filter: {
            and: [{
              field: "productId"
              query: "${productId}"
              type: "exact"
            }]
          }
          sort: {
            field: "createdOn"
            order: "desc"
          }
        }) {
          data {
            userEmail
            qa {
              question
              createdOn
            }
          }
        }
      }
    `);

    this.setState({ QAList: result.getProductQAList.data });
  };

  submit = e => {
    e.preventDefault();

    const { getData, transformLocale, form, productId } = this.props;
    const { validateFields, resetFields } = form;

    validateFields(async (err, { userEmail, question }) => {
      if (!err) {
        const { data: result } = await getData(`
          mutation {
            createProductQA(createProductQA: [{
              productId: "${productId}"
              qa: [{
                question: "${question}"
              }]
              ${!userEmail ? '' : `userEmail: "${userEmail}"`}
            }]) {
              userEmail
              qa {
                question
                createdOn
              }
            }
          }
        `);

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
          itemLayout="horizontal"
          dataSource={QAList}
          renderItem={({ qa, userEmail }, index) => {
            const [{ question, createdOn }, replay] = qa;
            const [email] = (userEmail || '').split(/@/);

            return (
              <ListItem
                extra={
                  qa.length === 1 ? null : (
                    <React.Fragment>
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
                          {replay.question} ({moment(
                            replay.createdOn * 1000,
                          ).format('YYYY/MM/DD HH:mm:ss')})
                        </div>
                      )}
                    </React.Fragment>
                  )
                }
                actions={[
                  `${email.length > 5 ? email.slice(0, 5) : email}*****`,
                  moment(createdOn * 1000).format('YYYY/MM/DD HH:mm:ss'),
                ]}
              >
                <ListItemMeta description={question} />
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
                  type: 'email',
                  message: transformLocale(LOCALE.NOT_EMAIL),
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
