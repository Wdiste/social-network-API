const router = require('express').Router();

// functions corresponding to User model
// references /contollers/userController
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addAssignment,
  removeAssignment,
} = require('../../controllers/userController');

// Get returns all users from the db
// POST creates one user from the db
router.route('/').get(getUsers).post(createUser);

// GET returns one user specified in params from the db
// DELETE removes one user specified in params from the db
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// adds a friend to the friends array that belongs to user 
// specified from the db
router.route('/:userId/friends').post(addFriend);

// removes a friend to the friends array that belongs to user 
// specified from the db
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
