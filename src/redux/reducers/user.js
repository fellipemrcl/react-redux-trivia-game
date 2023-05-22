import { actionTypes } from '../actions/index';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
  assertions: 0,
  settings: {},
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case actionTypes.GET_USER:
    return {
      ...state,
      gravatarEmail: payload.email,
      name: payload.name,
    };
  default:
    return state;
  }
};

export default userReducer;
