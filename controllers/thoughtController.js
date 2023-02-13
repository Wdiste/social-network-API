const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find({})
      .populate('reactions')
      .then((thought) => {
        res.json(thought)
      })
      .catch((err) => res.status(500).json(err.message));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err.message));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>{ User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      )
        .then((user) => res.json(thought))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
      })
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>{
        if(!thought){
          throw new Error('No thought with that ID');
        } else {
          Thought.reactions.deleteMany({ _id: { $in: thought.reactions } })
        }
      })
      .then(() => res.json({ message: 'Thoughts and reactions deleted!' }))
      .catch((err) => {
        if(err.message == 'No thought with that ID') {
          res.status(404).json({ message: err.message });
        } else {
          res.status(500).json({ message: err.message }); 
        }
      }  
  )},
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },



  // =====================================================================
  // =======  reaction controllers  ========================================
  // =====================================================================

  getReactions(req, res) {
    Thought.find({ function (err, data) { return this.reactions } })
      .then((reaction) => {
        console.log(reaction);
        res.json(reaction)
      })
      .catch((err) => res.status(500).json(err));
  },
  getSingleReaction(req, res) {
    Thought.findById({ _id: req.params.id, function (err, data) { return this.reactions } })
      .then((reaction) => {
        console.log(reaction);
        res.json(reaction)
      })
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: { $in: [req.params.reactionId] } } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};