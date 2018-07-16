import { SHIPMENT_STORE_FIELDS } from '../constants';
import * as LOCALE from '../locale';

export default ({ transformLocale, form: { getFieldsValue } }) => {
  const data = getFieldsValue(SHIPMENT_STORE_FIELDS);

  return Object.keys(data).map(
    (key, index) =>
      !data[key]
        ? null
        : `${transformLocale(
            [LOCALE.STORE_NAME, LOCALE.STORE_ADDRESS, LOCALE.STORE_ID][index],
          )}：${data[key]}`,
  );
};
