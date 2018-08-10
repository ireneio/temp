import storePkg from '@meepshop/store/package.json';

import pkg from '../../package.json';

it('check isomorphic-unfetch version', () => {
  expect(storePkg.dependencies['isomorphic-unfetch']).toBe(
    pkg.dependencies['isomorphic-unfetch'],
  );
});
