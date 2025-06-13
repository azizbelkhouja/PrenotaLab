import { GET_SEMINARI, SELECT_SEMINARIO,GET_SUGGESTIONS } from '../types';

const initialState = {
  seminari: [],
  randomSeminario: null,
  latestSeminari: [],
  nowShowing: [],
  comingSoon: [],
  selectedSeminario: null,
  suggested: []
};

const getSeminari = (state, payload) => {
  const latestSeminari = payload
    .sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
    .slice(0, 5);

  const nowShowing = payload.filter(
    seminario =>
      new Date(seminario.endDate) >= new Date() &&
      new Date(seminario.releaseDate) < new Date()
  );

  const comingSoon = payload.filter(
    seminario => new Date(seminario.releaseDate) > new Date()
  );

  return {
    ...state,
    seminari: payload,
    randomSeminario: payload[Math.floor(Math.random() * payload.length)],
    latestSeminari,
    nowShowing,
    comingSoon
  };
};

const onSelectSeminario = (state, payload) => ({
  ...state,
  selectedSeminario: payload
});

const getSeminarioSuggestions = (state, payload) =>({
  ...state,
  suggested: payload
})

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SEMINARI:
      return getSeminari(state, payload);
    case SELECT_SEMINARIO:
      return onSelectSeminario(state, payload);
    case GET_SUGGESTIONS:
      return getSeminarioSuggestions(state, payload);
    default:
      return state;
  }
};
