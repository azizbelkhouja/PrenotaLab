import { GET_LABS, GET_LAB } from '../types';

const initialState = {
  labs: [],
  selectedLab: null
};

const getLabs = (state, payload) => ({
  ...state,
  labs: payload
});

const getLab = (state, payload) => ({
  ...state,
  selectedLab: payload
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LABS:
      return getLabs(state, payload);
    case GET_LAB:
      return getLab(state, payload);
    default:
      return state;
  }
};
