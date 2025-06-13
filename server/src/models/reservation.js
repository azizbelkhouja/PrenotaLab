const mongoose = require('mongoose');

const { Schema } = mongoose;
const reservationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  seminarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Seminario',
    required: true,
  },
  labId: {
    type: Schema.Types.ObjectId,
    ref: 'Lab',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  checkin: {
    type: Boolean,
    default: false,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
