import { takeEvery, call, select } from 'redux-saga/effects';
import { notification } from 'antd';
import * as Api from 'api';
import * as LOCALE from '../../locale';

/* ********************************* 更改顧客密碼 ********************************* */
const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';

export const changePassword = payload => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload,
});

function* changePasswordFlow({ payload }) {
  const {
    storeReducer: {
      settings: { locale },
    },
  } = yield select();
  try {
    const { data } = yield call(Api.changePassword, payload);
    if (data) {
      const { status } = data.changeUserPassword;
      switch (status) {
        case 0: {
          notification.success({
            message: LOCALE.CHANGE_PASSWORD_SUCCESS[locale],
          });
          break;
        }
        default:
          notification.error({
            message: LOCALE.CHANGE_PASSWORD_FAILURE_MESSAGE[locale],
          });
          break;
      }
    }
  } catch (error) {
    console.log(
      `Error: ${error.message}, Stack: ${JSON.stringify(error.stack)}`,
    );
    notification.error({ message: '更改密碼：發生錯誤' });
  }
}
export function* watchChangePasswordFlow() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordFlow);
}
