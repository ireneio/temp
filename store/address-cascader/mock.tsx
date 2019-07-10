import React, { useState } from 'react';

import AddressCascader from './src';

export default React.memo(() => {
  const [value, onChange] = useState(['台灣', '臺北市', '信義區']);
  const [notFound, onChangeNotFound] = useState(['台灣', '台北市', '信義區']);

  return (
    <>
      <AddressCascader />

      <AddressCascader
        value={value}
        onChange={newValue => onChange(newValue)}
      />

      <AddressCascader
        value={notFound}
        onChange={newValue => onChangeNotFound(newValue)}
      />
    </>
  );
});
