const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Get a single thought by its _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            // instructing Mongoose to exclude the __v field in order to reduce the response payload.
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Create a thought and add it to a user's "thoughts" array field
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            // Find the user associated with the thought
            const user = await User.findOneAndUpdate(
                // find the user by its _id in req.body
                { _id: req.body.userId },
                // add the thought _id to the user's thoughts array field
                { $push: { thoughts: thought._id } },
                // instruct Mongoose to return the updated user
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Update a thought by its _id
    async updateThought(req, res) {
        try {
            const Thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
            res.json(Thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ 
                    message: 'No thought found with this id!' 
                });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // add the reaction to the thought's reactions array field
                { $push: { reactions: req.body } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // remove the reaction from the thought's reactions array field
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};