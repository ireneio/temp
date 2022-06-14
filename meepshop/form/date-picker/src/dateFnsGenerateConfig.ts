// typescript import
import { GenerateConfig } from 'rc-picker/lib/generate';
import { Locale as DateFnsLocale } from 'date-fns';

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

// FIXME: https://github.com/react-component/picker/issues/232
// definition
const localeParse = (format: string): string => {
  return format
    .replace(/Y/g, 'y')
    .replace(/D/g, 'd')
    .replace(/gggg/, 'yyyy')
    .replace(/g/g, 'G')
    .replace(/([Ww])o/g, 'wo');
};

const generateConfig = (dateFnsLocale: DateFnsLocale): GenerateConfig<Date> => {
  return {
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
      getWeekFirstDay: () => dateFnsLocale.options?.weekStartsOn || 1,
      getWeekFirstDate: (_, date) =>
        startOfWeek(date, { locale: dateFnsLocale }),
      getWeek: (_, date) => getWeek(date, { locale: dateFnsLocale }),
      getShortWeekDays: () =>
        Array.from({ length: 7 }).map((_, i) =>
          dateFnsLocale.localize?.day(i, { width: 'short' }),
        ),
      getShortMonths: () =>
        Array.from({ length: 12 }).map((_, i) =>
          dateFnsLocale.localize?.month(i, { width: 'abbreviated' }),
        ),
      format: (_, date, format) => {
        if (!isValidate(date)) return '';

        return formatDate(date, localeParse(format), {
          locale: dateFnsLocale,
        });
      },
      parse: (_, text, formats) => {
        for (let i = 0; i < formats.length; i += 1) {
          const format = localeParse(formats[i]);
          const formatText = text;
          const date = parseDate(formatText, format, new Date(), {
            locale: dateFnsLocale,
          });

          if (isValidate(date)) return date;
        }

        return null;
      },
    },
  };
};

export default generateConfig;
