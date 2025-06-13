const mongoose = require('mongoose');

const { Schema } = mongoose;
const showtimeSchema = new Schema({
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
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
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
