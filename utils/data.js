const usernames = [
    'JamesBond',
    'HarryPotter',
    'DarthVader',
    'JackSparrow',
    'Thor',
    'Hulk',
    'BlackPanther',
    'Wolverine',
    'Deadpool',
    'AustinPowers',
];

const getEmailFromUsername = (username) => {
    const lowercaseUsername = username.toLowerCase();
    return `${lowercaseUsername}@gmail.com`;
  };

const emails = usernames.map(getEmailFromUsername);

const thoughts = [
    'Decision Trackers are awesome',
    'Find My Phone is a useful app',
    'Learn Piano is not very good for learning Piano',
    'Starbase Defender is a great game, I love it',
    'Tower Defense is okay',
    'Monopoly Money is better than real money IMO',
    'Movie trailers are just the best parts of a movie distilled into 90 seconds',
    'Hello world, this is a comment',
    'Social media is a big waste of time',
    'Notes is my most used app',
    'Messages is open on my computer 24/7',
    'Email is open on my computer',
    'Compass is never opened',
    'Firefox is great for privacy',
];

const reactions = [
    "Great thought!",
    "I completely agree!",
    "Interesting perspective.",
    "Well said!",
    "I have a different opinion.",
    "Thanks for sharing!",
  ];

module.exports = { usernames, emails, thoughts, reactions}

