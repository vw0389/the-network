const { process_params } = require('express/lib/router');
const User = require('../models/User');
const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })

    },
    getUserById({params},res) {
        User.findOne({ _id: params.id})
        .then( data => res.json(data))
        .catch( err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createUser({body},res) {
        User.create(body)
            .then(dbData => res.json(dbData))
            .catch (err => res.json(err));
    },
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id},body, {new:true, runValidators: true})
            .then( data => {
                if (!data) {
                    res.status(404).json({message: "no user found with that id"});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    deleteUserById ({params},res) {
        User.findOneAndDelete({ _id: params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    addFriendToList({ params, body }, res) {
        User.findOneAndUpdate(
            {
                _id: params.userId
            },
            {$push: {friends: params.friendId}},
            {new: true}
        )
            .then (data => {
                if (!data) {
                    res.status(404).json({message: "No user found with this id"});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    removeFriendFromList({ params, body }, res) {
        User.findOneAndUpdate(
            {
                _id: params.userId
            },
            {$pull: {friends: params.friendId}},
            {new: true}
        )
            .then (data => {
                if (!data) {
                    res.status(404).json({message: "No user found with this id"});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    }
};

module.exports = userController;