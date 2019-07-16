// import
import React from 'react';

import generateConverter from './utils/generateConverter';

// definition
export default React.createContext({
  convertCurrency: generateConverter('TWD', 'TWD'),
  setCurrency: (currency: string) => {
    console.log('set currency to', currency);
  },
  currency: 'TWD',
});
