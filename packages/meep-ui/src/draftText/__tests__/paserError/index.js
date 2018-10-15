import React from 'react';
import { mount } from 'enzyme';

import DraftText from '../..';

test('draft text parser error', () => {
  const mockLog = jest.fn();

  global.console.log = mockLog;

  mount(<DraftText value="{entityMap, paserError}" />);

  expect(mockLog).toHaveBeenCalledWith(
    '<< formatRawContent >> Error: Unexpected token e in JSON at position 1 - {entityMap, paserError}',
  );
});
