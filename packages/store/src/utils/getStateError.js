/**
 * @name getStateError
 * @description  get error from state for display error view
 * @param state
 * @returns error
 */
export default state => {
  const {
    memberReducer: { error: memberErr },
    pagesReducer: { error: pagesErr },
    productsReducer: { error: productsErr },
  } = state;
  return memberErr || pagesErr || productsErr;
};
