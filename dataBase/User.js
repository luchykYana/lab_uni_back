const {Schema, model} = require('mongoose');

const passwordService = require('../service/password.service');

const userSchema = new Schema({
    avatar: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    rememberPassword: {
        type: Boolean,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    textarea: {
        type: String,
        required: true
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    },

    normaliseUser() {
        const fieldsToRemove = [
            'password',
            '__v',
            'id'
        ];

        const normalisedUser = this.toObject();

        fieldsToRemove.forEach((field) => delete normalisedUser[field]);

        return normalisedUser;
    }
};

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    }
};

module.exports = model('user', userSchema);
