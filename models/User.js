const { isEmail } = require('validator');

const { Schema, model, ObjectId } = require('mongoose');
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
    thoughts: [
      { 
        thought_id: ObjectId,
      }
    ],
    friends: [
      { 
        user_id :  ObjectId,
      }
    ]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

userSchema
  .virtual('friend count')
  .get(function() { return  this.friends.length})

const User = model('user', userSchema);

module.exports = User;