import { isHexColor } from 'validator';

import LOCALE from 'constants/locale';

import validatorMessage from './utils/validatorMessage';
import buildContextStory from './utils/buildContextStory';

buildContextStory({
  storyPathname: 'location',
  dataName: 'Location',
  getData: data => data.location,
  fieldsData: [
    {
      fieldKey: 'host',
      fieldSetting: {
        rules: [
          {
            required: true,
          },
          {
            validator: validatorMessage(
              value => /^[a-zA-Z.]+(:[0-9]{0,4})?$/.test(value),
              'host must be "^[a-zA-Z.]+(:[0-9]{0,4})?$"',
            ),
          },
        ],
      },
    },
    {
      fieldKey: 'pathname',
      fieldSetting: {
        rules: [
          {
            required: true,
          },
          {
            validator: validatorMessage(
              value => /^\//.test(value),
              'host pathname must be "^/"',
            ),
          },
        ],
      },
    },
    {
      fieldKey: 'search',
      fieldSetting: {
        noUndefined: true,
        rules: [
          {
            validator: validatorMessage(
              value => /^\??/.test(value),
              'search must be "^?"',
            ),
          },
        ],
      },
    },
  ],
});

buildContextStory({
  storyPathname: 'locale',
  dataName: 'Locale',
  getData: data => data,
  fieldsData: [
    {
      fieldKey: 'locale',
      fieldSetting: {
        rules: [
          {
            required: true,
          },
          {
            validator: validatorMessage(
              value => LOCALE.includes(value),
              `locale must be one of [${LOCALE.join(', ')}]`,
            ),
          },
        ],
      },
    },
  ],
});

/** storeSetting */
buildContextStory({
  storyPathname: 'storeSetting/colors',
  dataName: 'Colors',
  getData: data => data.storeSetting.colors,
  handleFieldKey: fieldKey => parseInt(fieldKey.replace(/color-/, ''), 10),
  handleFieldValue: fieldValue => fieldValue.toUpperCase(),
  fieldsData: [].constructor.apply({}, new Array(6)).map((_, index) => ({
    fieldKey: `color-${index}`,
    fieldSetting: {
      rules: [
        {
          required: true,
        },
        {
          validator: validatorMessage(isHexColor, 'not a color'),
        },
      ],
    },
  })),
});
