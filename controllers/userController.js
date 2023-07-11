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
    // Get a single user by its id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
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
            const user = await User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.id });

            if (!user) {
                return res.status(404).json({ 
                    message: 'No user found with this id!' 
                });
            }

            // remove the user's associated thoughts from the database
            await Thought.deleteMany({ username: user.username });
            // remove the user's associated friends from the database
            await User.updateMany(
                { _id: { $in: user.friends } },
                { $pull: { friends: user._id } }
            );

            res.json(user);
        } catch {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate( { _id: req.params.userId }, { $addToSet : { friends: req.params.friendId } }, { new: true } );

            const friend = await User.findOneAndUpdate( { _id: req.params.friendId }, { $addToSet : { friends: req.params.userId } }, { new: true } );

            if (!user || !friend) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json({ user, friend, message: 'Friend added!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a friend from a user's friend list
    async deleteFriend(req, res) {
        try {
            
            const { userId, friendId } = req.params;

            const user = await User.findByIdAndUpdate(
              userId,
              { $pull: { friends: friendId } },
              { new: true }
            );
        
            if (!user) {
              return res
                .status(404)
                .json({ message: 'No user found with this id!' });
            }
        
            const friend = await User.findByIdAndUpdate(
              friendId,
              { $pull: { friends: userId } },
              { new: true }
            );
        
            if (!friend) {
              return res
                .status(404)
                .json({ message: 'No friend found with this id!' });
            }

            res.json({ user, friend, message: 'Friend deleted!' });

            // res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};