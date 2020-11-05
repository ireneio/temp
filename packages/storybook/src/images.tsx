// import
import React from 'react';

import Images from '@meepshop/images/mock';

import Readme from './components/Readme';

// definition
export const readme = (): React.ReactNode => <Readme name="@meepshop/images" />;
export const demo = (): React.ReactNode => <Images />;

export default {
  title: '@meepshop/images',
};
