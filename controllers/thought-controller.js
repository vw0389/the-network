const { process_params } = require('express/lib/router');
const User = require('../models/User');
const Thought = require('../models/Thought');
const thoughtController = {
    getAllThoughts,
    postThought,
    getThoughtById,
    updateThoughtById,
    removeThoughtById,
    postReactionById,
    removeReactionById
};
module.exports = thoughtController;