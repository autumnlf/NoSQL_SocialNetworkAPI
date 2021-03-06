const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/usersController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:id/friends/:friendId
router.route('/:id/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;