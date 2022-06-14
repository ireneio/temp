// typescript import
import { PickerProps } from 'antd/lib/date-picker/generatePicker';

// import
import React from 'react';
import generatePicker from 'antd/lib/date-picker/generatePicker';
import enUS from 'date-fns/locale/en-US';
import zhTW from 'date-fns/locale/zh-TW';

import { useTranslation } from '@meepshop/locales';

import dateFnsGenerateConfig from './dateFnsGenerateConfig';

// definition
const AdminDatePicker = generatePicker<Date>(dateFnsGenerateConfig(enUS));

export { AdminDatePicker };

export default React.memo((props: PickerProps<Date>) => {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'zh_TW' ? zhTW : enUS;

  const Component = generatePicker<Date>(dateFnsGenerateConfig(locale));
  return <Component {...props} />;
});
