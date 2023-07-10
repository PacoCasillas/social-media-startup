const { Schema, Types } = require('mongoose');
const moment = require('moment');

const dateFormat = createdAt => {
    return moment(createdAt).format('MMM DD, YYYY [at] hh:mm a');
}

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // Default value is set to a new ObjectId
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: [true, 'Reaction body is required'],
            maxLength: 280,
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => dateFormat(createdAt)
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;