const { Schema, model } = require('mongoose');

// I have to add this here because I will need it later. 
// If I define this after the 'get' function it wont be accessible
// at the time when the get function is called.
// JavaScript is a top-down lenguage so it reads from top to bottom

const dateFormat = createdAt => {
    return moment(createdAt).format('MMM DD, YYYY [at] hh:mm a');
}

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
            // Use a getter method to format the timestamp on query
            get: (createdAt) => dateFormat(createdAt)
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