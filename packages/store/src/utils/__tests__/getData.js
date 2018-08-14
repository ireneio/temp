import { setFetchData } from 'isomorphic-unfetch';

import getData from '../getData';

describe('getData', () => {
  beforeAll(() => {
    global.window.meepShopStore = {
      XMeepshopDomain: 'XMeepshopDomain',
    };
  });

  it('api server has error', () => {
    setFetchData(() => ({
      status: 500,
      statusText: 'api server error',
    }));

    expect(getData('query', 'variables')).resolves.toBeNull();
  });

  it('api server work but graphql server has error', () => {
    setFetchData(() => ({
      status: 200,
      json: () => ({
        error: 'graphql server error',
      }),
    }));

    expect(getData('query', 'variables')).resolves.toBeNull();
  });

  it('api server and graphql server work', () => {
    setFetchData(() => ({
      status: 200,
      json: () => ({
        data: 'data',
      }),
    }));

    expect(getData('query', 'variables')).resolves.toEqual({
      data: 'data',
    });
  });
});
