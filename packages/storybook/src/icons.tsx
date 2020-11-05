// import
import React from 'react';

import Icons from '@meepshop/icons/mock';

import Readme from './components/Readme';

// definition
export const readme = (): React.ReactNode => <Readme name="@meepshop/icons" />;
export const demo = (): React.ReactNode => <Icons />;

export default {
  title: '@meepshop/icons',
};
