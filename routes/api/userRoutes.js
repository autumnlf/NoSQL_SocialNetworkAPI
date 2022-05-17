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
router.route('/:id').get(getSingleUser).delete(deleteUser);
//router.route('/:id').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:id/friends/:friendId
router.route('/:id/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;