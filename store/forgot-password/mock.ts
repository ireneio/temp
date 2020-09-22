export default {
  token: 'test-token',
  dispatchAction: (dispatchName: string, data: unknown) =>
    // eslint-disable-next-line no-console
    console.log(dispatchName, data),
};
