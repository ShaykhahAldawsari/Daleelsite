const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffname: {
    type: String,
    required: true
  },
  maintainencenumber: {
    type: String,
    required: true
  },
  staffsection: {
    type: String,
    required: true
  },
  roomnumber: {
    type: String,
    required: true
  },
  map: {
    type: String,
    required: true
  }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
