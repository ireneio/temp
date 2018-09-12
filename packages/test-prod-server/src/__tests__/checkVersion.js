import storePkg from '@meepshop/store/package.json';

import pkg from '../../package.json';

['isomorphic-unfetch', 'express-http-proxy'].forEach(name => {
  it(`check ${name} version`, () => {
    expect(storePkg.dependencies[name]).toBe(pkg.dependencies[name]);
  });
});
