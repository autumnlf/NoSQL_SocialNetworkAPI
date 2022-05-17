const { Schema, model } = require('mongoose');
//const thoughtsSchema = require('./thoughts');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/] //regex for a valid email
        },
        thoughts: [],
        friends: [{
            type: Schema.Types.ObjectID,
            ref: 'Users'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = model('users', userSchema);

module.exports = Users;