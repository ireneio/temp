/**
 * @name getStateError
 * @description  get error from state for display error view
 * @param state
 * @returns error
 */
export default state => {
  const {
    memberReducer: { error: memberErr },
  } = state;
  return memberErr;
};
