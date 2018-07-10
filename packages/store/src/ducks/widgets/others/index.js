import { takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import * as Api from 'api';

/* ********************************* 更改顧客密碼 ********************************* */
const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';

export const changePassword = payload => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload,
});

function* changePasswordFlow({ payload }) {
  try {
    const { data } = yield call(Api.changePassword, payload);
    if (data) {
      const { status } = data.changeUserPassword;
      switch (status) {
        case 0: {
          notification.success({ message: '更改密碼：發生錯誤' });
          break;
        }
        default:
          notification.error({ message: '更改密碼：發生錯誤' });
          break;
      }
    }
  } catch (error) {
    console.error(error);
    notification.error({ message: '更改密碼：發生錯誤' });
  }
}
export function* watchChangePasswordFlow() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordFlow);
}
