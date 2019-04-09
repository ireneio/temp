import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import Router from 'next/router';
import Head from 'next/head';

const { Item } = Form;

@Form.create()
export default class Login extends React.PureComponent {
  grecaptchaRef = React.createRef();

  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    const loadedGrecaptcha = setInterval(() => {
      if (!window.grecaptcha && !window.grecaptcha.render) return;

      clearInterval(loadedGrecaptcha);
      window.grecaptcha.render('grecaptcha', {
        sitekey: '6Lf4iDsUAAAAADGIX1WYcChAZrQNEE36rAu3MkOa',
      });
    }, 100);
  }

  login = e => {
    e.preventDefault();

    const {
      form: { validateFields },
    } = this.props;

    validateFields(async (err, { email, password }) => {
      await fetch('/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          email,
          password,
          'g-recaptcha-response': window.grecaptcha.getResponse(),
        }),
      })
        .then(res => res.json())
        .then(({ adminStatus, error }) => {
          if (adminStatus) Router.push({ pathname: '/' });
          else message.error(error);
        });
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <>
        <Head>
          <script src="https://www.google.com/recaptcha/api.js" async defer />
        </Head>

        <Form onSubmit={this.login}>
          <Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            })(<Input placeholder="email" />)}
          </Item>

          <Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(<Input type="password" placeholder="Password" />)}
          </Item>

          <Button type="primary" htmlType="submit">
            Log in
          </Button>

          <div id="grecaptcha" />
        </Form>
      </>
    );
  }
}
