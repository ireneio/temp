export default ({ message }) => {
  switch (message) {
    case '[repository] getOrderWithProductsByIdProtectedScope error':
      return false;

    default:
      return true;
  }
};
