const { isEmail } = require('validator');

const { Schema, model} = require('mongoose');

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
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      { 
        type:  Schema.Types.ObjectId,
        ref: 'User'
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