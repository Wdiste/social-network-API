const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

// GET returns all thoughts from the db
// POST creates one thought from the db
router.route('/').get(getThoughts).post(createThought);

// GET returns one thought from the db
// PUT updates one thought from the db
// DELETE removes one thought from the db
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
