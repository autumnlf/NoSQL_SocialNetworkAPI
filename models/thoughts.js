const { Schema, model } = require('mongoose');
const formatTime = { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectID,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => createdAtValue.toLocaleDateString(undefined, formatTime)
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => createdAtValue.toLocaleDateString(undefined, formatTime)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionsSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;