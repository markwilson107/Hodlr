const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
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
  color: {
    type: String,
    default: '#ffce49'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', function(next) {
  let user = this;

  // If not registration
  if ( !user.isModified('password') ) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

// Password verification
UserSchema.methods.login = function(password) {
  let user = this
  console.log(user.password)
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      if ( err ) { return reject(err) }
      resolve(result)
    })
  })
};

const User = mongoose.model('User', UserSchema);

module.exports = User;