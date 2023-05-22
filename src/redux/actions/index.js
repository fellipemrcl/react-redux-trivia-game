export const actionTypes = {
  GET_USER: 'GET_USER',
};

export const getUserAction = (payload) => ({
  type: actionTypes.GET_USER,
  payload,
});
