export const actionTypes = {
  GET_USER: 'GET_USER',
  SET_SCORE: 'SET_SCORE',
};
export const getUserAction = (payload) => ({
  type: actionTypes.GET_USER,
  payload,
});
export const setScoreAction = (payload) => ({
  type: actionTypes.SET_SCORE,
  payload,
});
