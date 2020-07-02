import React from 'react';
import { storiesOf } from '@storybook/react';

// eslint-disable-next-line import/no-extraneous-dependencies
import Images from '@meepshop/images/mock';

import './styles/base.less';

const demo = () => <Images />;

if (process.env.STORYBOOK_ENV === 'dev')
  storiesOf('@meepshop/images', module).add('demo', demo);
else storiesOf('@meepshop', module).add('images', demo);
