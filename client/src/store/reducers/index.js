import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';
import seminari from './seminari';
import labs from './labs';
import reservations from './reservations';
import showtimes from './showtimes';
import checkout from './checkout';

export default combineReducers({
  alertState: alert,
  authState: auth,
  userState: users,
  seminarioState: seminari,
  labState: labs,
  reservationState: reservations,
  showtimeState: showtimes,
  checkoutState: checkout
});
