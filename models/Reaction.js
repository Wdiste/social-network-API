const { ObjectId } = require('bson');
const { Schema } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
      default: new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: moment().format('MMM DD YYYY, h:mm a'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
