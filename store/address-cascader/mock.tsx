// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React, { useState } from 'react';
import { WithTranslation } from '@store/utils/lib/i18n';

import AddressCascader from './src';

// definition
export default React.memo(
  WithTranslation('common')(({ i18n }: I18nPropsType) => {
    const [emptyValue, onChangeEmptyValue] = useState(undefined);
    const [value, onChange] = useState({
      address: [
        'a1e4aa6c-5a52-408a-9ede-471b10b1e265',
        '804df1c0-b99d-482b-9014-1fa49dc9b428',
        '4d0e80e7-23da-43d5-856d-50dce23bff89',
      ],
      zipCode: '199',
    });

    return (
      <>
        <AddressCascader i18n={i18n} />

        <AddressCascader
          i18n={i18n}
          lockedCountry={['a1e4aa6c-5a52-408a-9ede-471b10b1e265']}
        />

        <AddressCascader
          i18n={i18n}
          lockedCountry={['6cd709bd-3d05-47a4-b86d-b54e64af0538']}
        />

        <AddressCascader
          i18n={i18n}
          value={emptyValue}
          onChange={newValue => onChangeEmptyValue(newValue)}
        />

        <AddressCascader
          i18n={i18n}
          value={value}
          onChange={newValue => onChange(newValue)}
        />
      </>
    );
  }),
);
