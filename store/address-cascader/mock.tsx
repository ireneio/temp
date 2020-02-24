// import
import React, { useState } from 'react';

import { useTranslation } from '@store/utils/lib/i18n';

import AddressCascader from './src';

// definition
export default React.memo(() => {
  const { i18n } = useTranslation('common');
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
      <AddressCascader
        i18n={i18n}
        value={emptyValue}
        onChange={newValue => onChangeEmptyValue(newValue)}
        placeholder={['', '']}
      />

      <AddressCascader
        i18n={i18n}
        value={value}
        onChange={newValue => onChange(newValue)}
        placeholder={['', '']}
      />

      <AddressCascader
        i18n={i18n}
        value={emptyValue}
        onChange={newValue => onChangeEmptyValue(newValue)}
        lockedCountry={['a1e4aa6c-5a52-408a-9ede-471b10b1e265']}
        placeholder={['', '']}
      />

      <AddressCascader
        i18n={i18n}
        value={value}
        onChange={newValue => onChange(newValue)}
        lockedCountry={['6cd709bd-3d05-47a4-b86d-b54e64af0538']}
        placeholder={['', '']}
      />
    </>
  );
});
