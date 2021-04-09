export default alignment => {
  switch (alignment) {
    case 'right':
      return 'FLEX_END';

    case 'left':
      return 'FLEX_START';

    default:
      return alignment.toUpperCase().replace(/-/, '_');
  }
};
