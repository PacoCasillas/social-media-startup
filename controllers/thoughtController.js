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
            const thought = await Thought.findOne({ _id: req.params.id })
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
                { username: req.body.username },
                // add the thought _id to the user's thoughts array field
                { $addToSet: { thoughts: thought._id } },
                // instruct Mongoose to return the updated user
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that username!' });
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
            const thought = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.id });

            if (!thought) {
                return res.status(404).json({ 
                    message: 'No thought found with this id!' 
                });
            }

            // Bonus: Remove the thought from the associated user's thoughts array field
            const user = await User.findOneAndUpdate(
                { thoughts: req.params.id },
                { $pull: { thoughts: req.params.id } },
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
    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // add the reaction to the thought's reactions array field
                { $addToSet: { reactions: req.body } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json({ message: 'Reaction added!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Remove a reaction from a thought
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // remove the reaction from the thought's reactions array field
                { $pull: { reactions: { reactionId: req.params.reactionId } } },                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json({ message: 'Reaction deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};