const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// Set up GET all and POST (create) at /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

// Set up POST and DELETE at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// Set up DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;