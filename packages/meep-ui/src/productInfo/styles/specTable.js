export const root = edition => {
  if (edition === 'detail') {
    return {
      maxWidth: '500px',
    };
  }
  return {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '500px',
  };
};
