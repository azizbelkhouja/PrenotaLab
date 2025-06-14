import { GET_RESERVATIONS, GET_RESERVATION_SUGGESTED_SEATS } from '../types';

const initialState = {
  reservations: [],
  suggestedSeats: []
};

const getReservations = (state, payload) => ({
  ...state,
  reservations: payload
});

const getReservationSuggestedSeats = (state, payload) => ({
  ...state,
  suggestedSeats: payload
});

// Named reducer function
const reservationsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_RESERVATIONS:
      return getReservations(state, payload);
    case GET_RESERVATION_SUGGESTED_SEATS:
      return getReservationSuggestedSeats(state, payload);
    default:
      return state;
  }
};

export default reservationsReducer;