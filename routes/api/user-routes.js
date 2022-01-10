const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    addFriendToList,
    removeFriendFromList
} = require('../../controllers/user-controller');
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

router
    .route('/:userId/friends/:friendId')
    .post(addFriendToList)
    .delete(removeFriendFromList);
module.exports = router;