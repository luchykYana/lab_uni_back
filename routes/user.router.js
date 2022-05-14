const router = require('express').Router();

const {userMiddleware} = require('../middlewares');
const {userController} = require('../controllers');
const {createUserValidator} = require('../validators/user.validator');

router.get('/',
    userController.getUsers
);

router.post('/',
    userMiddleware.isUserBodyValid(createUserValidator),
    userMiddleware.checkUserByEmailMiddleware,
    userController.createUser
);

router.delete('/:user_id',
    userMiddleware.checkUserById,
    userController.deleteUser
);

module.exports = router;
