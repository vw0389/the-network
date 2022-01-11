const { process_params } = require('express/lib/router');
const User = require('../models/User');
const Thought = require('../models/Thought');
const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },
    postThought({body},res) {
        Thought.create(body)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    getThoughtById({params},res) {
        Thought.findOne({ _id: params.id})
            .then( data => res.json(data))
            .catch( err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    updateThoughtById({params,body},res) {
        Thought.findOneAndUpdate( {_id: params.id},
            {
                body
            },
            {new: true, runValidators: true})
            .then (data => {
               if (!data){
                   res.status(404).json({message: 'no thought with this id'});
                   return;
               }
               res.json(data);
            })
            .catch( err => res.json(err));
    },
    removeThoughtById({params},res) {
        Thought.findOneAndDelete({_id: params.id})
            .then (data => {
                if (!data){
                    res.status(404).json({message: 'no thought with this id'});
                    return;
                }
                res.json(data);
            })
            .catch( err => res.json(err));
    },
    postReactionById({params,body},res) {
        Thought.findOneAndUpdate( {_id: params.thoughtId},
            {$push: {reactions: body}},{
                new:true, runValidators: true
            }
        )
            .then (data => {
            if (!data){
                res.status(404).json({message: 'no thought with this id'});
                return;
            }
            res.json(data);
        })
            .catch( err => res.json(err));
    },
    removeReactionById({params},res) {
        Thought.findOneAndUpdate( {_id: params.thoughtId},
            {$pull: {reactions: params.reactionId}},
            { new: true, runValidators: true })
            .then (data => {
                if (!data){
                    res.status(404).json({message: 'no thought with this id'});
                    return;
                }
                res.json(data);
            })
            .catch( err => res.json(err));
    }
};
module.exports = thoughtController;