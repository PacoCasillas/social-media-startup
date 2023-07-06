const { Schema, model } = require('mongoose');

// Schema to create a new user
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is required'],
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            // match that this is a valid email address
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        // use virtuals to add a property to the schema that is not stored in MongoDB
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual 'friendCount' retrieves the length of the user's friends array field on query
userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

// initialize the User model
const User = model('user', userSchema);

module.exports = User;
