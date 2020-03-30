import React from 'react';
import { storiesOf } from '@storybook/react';

import Icons from '@meepshop/icons/mock';

import './styles/base.less';
import Wrapper from './Wrapper';

storiesOf('@meepshop/icons', module).add('demo', () => (
  <Wrapper>
    <Icons />
  </Wrapper>
));
