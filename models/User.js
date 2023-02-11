import { isEmail } from 'validator';

const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
      validate: [isEmail, 'Invalid email']
    },
    thoughts: [thoughtSchema],
    friends: [userSchema]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;