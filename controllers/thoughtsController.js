const { Thoughts, Users } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a thought
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.id })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a thought
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : Users.deleteMany({ _id: { $in: Thoughts.Users } })
            )
            .then(() => res.json({ message: 'Thoughts and Users deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a reaction
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No reaction with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //delete a reaction
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No reaction with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
};