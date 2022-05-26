const Posts = require('../models/Posts');

const postsData = [
    {
        "comment": "This was really helpful, thank you.",
        "projects_id": 1,
        "user_id": 3,
    },
    {
        "comment": "Wow, I learned a lot.",
        "projects_id": 1,
        "user_id": 2,
    },
    {
        "comment": "I think I know how to create a server now.",
        "projects_id": 2,
        "user_id": 5,
    },
    {
        "comment": "I didn't quite get what I was looking for.",
        "projects_id": 2,
        "user_id": 1,
    },
    {
        "comment": "Oof. Data miners nightmare.",
        "projects_id": 3,
        "user_id": 2,
    },
    {
        "comment": "Hmm. Yesss.",
        "projects_id": 3,
        "user_id": 4,
    },
    {
        "comment": "No! please no more coffee.",
        "projects_id": 4,
        "user_id": 5,
    },
    {
        "comment": "Somthing something, Darkside.",
        "projects_id": 4,
        "user_id": 5,
    },
];

const seedPosts = () => Posts.bulkCreate(postsData);

module.exports = seedPosts;