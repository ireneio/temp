// definition
export default (): {
  publicRuntimeConfig: {
    ENV: string;
    ROUTES: [];
  };
} => ({
  publicRuntimeConfig: {
    ENV: 'production',
    ROUTES: [],
  },
});
