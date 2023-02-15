const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        return res.status(500).json(err.message);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v") // this line ignores the verison key from mongodb
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ user })
      )
      .catch((err) => {
        return res.status(500).json(err.message);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          throw new Error("No such user exists");
        } else {
          const thoughts = user.thoughts;
          if(thoughts.length == 0){
            res.json('User deleted but no thoughts found')
          } else {
          thoughts.map((thoughtId) => Thought.findByIdAndDelete({ _id: thoughtId}));
          res.json('User and thoughts deleted');
          }
        }
      })
      .catch((err) => {
        if (err.message == "No such user exists") {
          res.status(404).json({ message: err.message });
        } else {
          res.status(500).json({ message: err.message });
        }
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // =====================================================================
  // =======  friend controllers  ========================================
  // =====================================================================

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.userId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json({ message: "new friend added!", user })
      )
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { $in: [req.params.friendId] } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json({ message: "Friend removed successfully!", user })
      )
      .catch((err) => res.status(500).json(err));
  },
};
