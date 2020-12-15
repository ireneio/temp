import initApollo from '@meepshop/apollo/lib/utils/initApollo';

import postGraphql from 'utils/postGraphql';
import getIn from 'utils/getIn';

/**
 * @description 註冊
 * @param {String} email
 * @param {String} password
 * @param {String} registeredCode 優惠代碼
 * @returns {Object}
 */
export default async values => {
  const variables = {
    keys: '$search: [NewUser]',
    type: 'mutation Signup',
    values: {
      search: [
        {
          type: 'SHOPPER',
          ...values,
        },
      ],
    },
  };
  const query = `
    createUserList(createUserList: $search) {
      id
      email
      _error
    }
  `;
  const response = await postGraphql({
    query,
    variables,
  });
  let data;
  // FIXME: 如果成功：回應空的user list (api需要修改)
  const userList = getIn(['data', 'createUserList'])(response);
  if (userList.length > 0) {
    data = { message: 'SIGNUP_SUCCESS' };
  } else {
    data = { error: 'Unexpected error' };
  }

  await initApollo({ name: 'store' }).resetStore();

  return data;
};
