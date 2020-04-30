import React from 'react';
import { storiesOf } from '@storybook/react';

import Icons from '@meepshop/icons/mock';

import './styles/base.less';

const demo = () => <Icons />;

if (process.env.STORYBOOK_ENV === 'dev')
  storiesOf('@meepshop/icons', module).add('demo', demo);
else storiesOf('@meepshop', module).add('icons', demo);
