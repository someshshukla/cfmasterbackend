const mongoose = require('mongoose');

const checkboxStateSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

const CheckboxState = mongoose.model('CheckboxState', checkboxStateSchema);

module.exports = CheckboxState;
