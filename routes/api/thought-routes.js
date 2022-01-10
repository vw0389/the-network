const router = require('express').Router();

const {
    getAllThoughts,
    postThought,
    getThoughtById,
    updateThoughtById,
    removeThoughtById,
    postReactionById,
    removeReactionById
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(postThought);
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(removeThoughtById);
router
    .route('/:thoughtId/reactions')
    .post(postReactionById);
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReactionById);
module.exports = router;