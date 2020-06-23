// import
import React from 'react';
import { mount } from 'enzyme';
import NextLink from 'next/link';

import Link from '../index';

// definition
describe('link', () => {
  test.each`
    href   | expected
    ${'/'} | ${{ href: '/' }}
  `('test $href shoule be equal to $expected', ({ href, expected }) => {
    expect(
      mount(
        <Link href={href}>
          <a href={href}>link</a>
        </Link>,
      )
        .find(NextLink)
        .props(),
    ).toEqual(expect.objectContaining(expected));
  });
});
