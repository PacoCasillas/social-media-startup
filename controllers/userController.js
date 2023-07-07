const { User, Thought} = require('../models');

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Get a single user by either their id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            // instructing Mongoose to exclude the __v field in order to reduce the response payload.
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate({_id: req.params.userId}, req.body, {new: true});
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});

            if (!user) {
                return res.status(404).json({ 
                    message: 'No user found with this id!' 
                });
            }

            // Bonus: remove a user's associated thoughts when deleted
            await Thought.deleteMany({ username: user.username });

            res.json({ message: 'User and associated thoughts deleted!' });
        } catch {
            console.log(err);
            res.status(500).json(err);
        }
    }
}