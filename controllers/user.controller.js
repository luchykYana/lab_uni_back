const {User} = require('../dataBase');
const {userService} = require('../service');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            const newUser = await User.createUserWithHashPassword(user);

            const normalizedUser = newUser.normaliseUser();

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

            const normalizedUsers = [];

            users.forEach((user, index) => {
                normalizedUsers[index] = user.normaliseUser();
            });

            res.json(normalizedUsers);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            await User.deleteOne(user);

            res.json('User is deleted!');
        } catch (e) {
            next(e);
        }
    }
}
