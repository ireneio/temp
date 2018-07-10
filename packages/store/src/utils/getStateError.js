/**
 * @name getStateError
 * @description  get error from state for display error view
 * @param state
 * @returns error
 */
export default state => {
  const {
    storeReducer: { error: storeErr },
    memberReducer: { error: memberErr },
    pagesReducer: { error: pagesErr },
    productsReducer: { error: productsErr },
  } = state;
  return storeErr || memberErr || pagesErr || productsErr;
};
