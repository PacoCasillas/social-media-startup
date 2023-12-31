const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Schema to create a new thought
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Thought text is required'],
            // Must be between 1 and 280 characters
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (createdAt) {
                return moment(createdAt).format("MMM DD, YYYY hh:mm A");
            }
        },
        // The user that created this thought
        username: {
            type: String,
            required: [true, 'Username is required']
        },
        // The reactions to this thought
        reactions: [
            // array of nested documents created with the reactionSchema
            reactionSchema
        ],
    },
    {
        // Include getters and virtuals
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: true,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
});

// Initialize the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;