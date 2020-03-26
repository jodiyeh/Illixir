const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: add more fields to the schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  confirm: {
    type: String,
    required: true,
    minlength: 6
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
