const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: moment().format('MMM DD YYYY, h:mm a'),
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals:true,
    },
  }
);

thoughtSchema
  .virtual('reaction count')
  .get(function() {return this.reactions.length})


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
