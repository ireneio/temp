// definition
export default (): {
  publicRuntimeConfig: {
    ENV: string;
  };
} => ({
  publicRuntimeConfig: {
    ENV: 'production',
  },
});
