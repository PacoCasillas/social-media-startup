const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

// Set up GET all and POST (create) at /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);