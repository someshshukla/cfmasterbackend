const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  plannedTasks: {
    type: [String],
    default: [],
  },
  achievedTasks: {
    type: [String],
    default: [],
  },
  challenges: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
});

const DayModel = mongoose.model('Day', daySchema);

module.exports = DayModel;
