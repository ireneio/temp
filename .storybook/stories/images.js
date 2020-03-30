import React from 'react';
import { storiesOf } from '@storybook/react';

import Images from '@meepshop/images/mock';

import './styles/base.less';
import Wrapper from './Wrapper';

storiesOf('@meepshop/images', module).add('demo', () => (
  <Wrapper>
    <Images />
  </Wrapper>
));
