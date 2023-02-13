const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  getReactions,
  getSingleReaction,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController.js');

// GET returns all thoughts 
// POST creates one thought 
router.route('/').get(getThoughts).post(createThought);

// GET returns one thought 
// PUT updates one thought 
// DELETE removes one thought 
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// GET returns all reactions that belong to this thought 
// PUT updates one reaction 
router.route('/:thoughtId/reactions')
  .get(getReactions)
  .post(addReaction);

// GET returns one reaction 
// DELETE removes one reaction 
router.route('/:thoughtId/reactions:reactionId')
  .get(getSingleReaction)
  .delete(removeReaction);

module.exports = router;
