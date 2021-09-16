// import
export * from './src/gqls';

// definition
if (process.env.NODE_ENV !== 'test') throw new Error('Do not import');
