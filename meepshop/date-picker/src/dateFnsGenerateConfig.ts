// typescript import
import { GenerateConfig } from 'rc-picker/lib/generate';

// import
import {
  getDay as getWeekDay,
  getYear,
  getMonth,
  getDate,
  endOfMonth as getEndDate,
  getHours as getHour,
  getMinutes as getMinute,
  getSeconds as getSecond,
  addYears as addYear,
  addMonths as addMonth,
  addDays as addDate,
  setYear,
  setMonth,
  setDate,
  setHours as setHour,
  setMinutes as setMinute,
  setSeconds as setSecond,
  isAfter,
  isValid as isValidate,
  getWeek,
  startOfWeek,
  format as formatDate,
  parse as parseDate,
} from 'date-fns';
import zhTW from 'date-fns/locale/zh-TW';
import enUS from 'date-fns/locale/en-US';
import jaJP from 'date-fns/locale/ja';
import viVN from 'date-fns/locale/vi';
import frFR from 'date-fns/locale/fr';
import esES from 'date-fns/locale/es';
import thTH from 'date-fns/locale/th';
import idID from 'date-fns/locale/id';

import { i18n } from '@meepshop/locales';

// FIXME: https://github.com/react-component/picker/issues/232
// definition
const locales: Record<string, Locale> = {
  zhTW,
  enUS,
  jaJP,
  viVN,
  frFR,
  esES,
  thTH,
  idID,
};

const dealLocal = (str: string): string => str.replace(/_/g, '');

const localeParse = (format: string): string => {
  return format
    .replace(/Y/g, 'y')
    .replace(/D/g, 'd')
    .replace(/gggg/, 'yyyy')
    .replace(/g/g, 'G')
    .replace(/([Ww])o/g, 'wo');
};

const generateConfig: GenerateConfig<Date> = {
  // get
  getNow: () => new Date(),
  getFixedDate: string => new Date(string),
  getEndDate,
  getWeekDay,
  getYear,
  getMonth,
  getDate,
  getHour,
  getMinute,
  getSecond,

  // set
  addYear,
  addMonth,
  addDate,
  setYear,
  setMonth,
  setDate,
  setHour,
  setMinute,
  setSecond,

  // Compare
  isAfter,
  isValidate,

  locale: {
    getWeekFirstDay: () => {
      const locale = locales[dealLocal(i18n.language)];

      return locale.options?.weekStartsOn || 1;
    },
    getWeekFirstDate: (_, date) => {
      const locale = locales[dealLocal(i18n.language)];

      return startOfWeek(date, { locale });
    },
    getWeek: (_, date) => {
      const locale = locales[dealLocal(i18n.language)];

      return getWeek(date, { locale });
    },
    getShortWeekDays: () => {
      const locale = locales[dealLocal(i18n.language)];

      return Array.from({ length: 7 }).map((_, i) =>
        locale.localize?.day(i, { width: 'short' }),
      );
    },
    getShortMonths: () => {
      const locale = locales[dealLocal(i18n.language)];

      return Array.from({ length: 12 }).map((_, i) =>
        locale.localize?.month(i, { width: 'abbreviated' }),
      );
    },
    format: (_, date, format) => {
      if (!isValidate(date)) return '';

      const locale = locales[dealLocal(i18n.language)];

      return formatDate(date, localeParse(format), {
        locale,
      });
    },
    parse: (_, text, formats) => {
      const locale = locales[dealLocal(i18n.language)];

      for (let i = 0; i < formats.length; i += 1) {
        const format = localeParse(formats[i]);
        const formatText = text;
        const date = parseDate(formatText, format, new Date(), {
          locale,
        });

        if (isValidate(date)) return date;
      }

      return null;
    },
  },
};

export default generateConfig;
