import { takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';

import { i18n } from '@meepshop/utils/lib/i18n';

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
          notification.success({
            message: i18n.t('ducks:change-password-success'),
          });
          break;
        }

        default:
          notification.error({
            message: i18n.t('ducks:change-password-failure-message'),
          });
          break;
      }
    }
  } catch (error) {
    notification.error({
      message: i18n.t('ducks:change-password-failure-message'),
    });
  }
}
export function* watchChangePasswordFlow() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordFlow);
}
