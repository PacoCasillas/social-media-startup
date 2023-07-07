const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");
const { usernames, emails, thoughts, reactions } = require("./data");

// Create a connection to the database
connection.once("open", async () => {
    console.log("Connected t the database");

try {
    // Delete all documents from the User, Thought and Reaction collections
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});

    // Create users 
    const users = [];
    for (let i = 0; i < usernames.length; i++) {
        const username = usernames[i];
        const email = emails[i];
        const user = await User.create({ username, email });


    // Create thoughts and reactions for each user
        for (let j = 0; j < 2; j++) {
            const thoughtText = thoughts[Math.floor(Math.random() * thoughts.length)];
            const thought = await Thought.create({ thoughtText, username: user.username });
        
            // Add reactions to the thought
            for (let k = 0; k < 3; k++) {
                const reactionBody = reactions[Math.floor(Math.random() * reactions.length)];
                const reaction = await Reaction.create({ reactionBody, username: user.username });
                thought.reactions.push(reaction);
            }

            user.thoughts.push(thought);
        }

        await user.save();
    }


    console.log("Sample data seeded successfully!");
    process.exit(0);

} catch (err) {
    console.log(err);
    process.exit(1);
}
});

