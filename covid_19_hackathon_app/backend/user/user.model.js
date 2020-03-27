const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: add more fields to the schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
userSchema.plugin(require('mongoose-beautiful-unique-validation'));


const User = mongoose.model('User', userSchema);
module.exports = User;
