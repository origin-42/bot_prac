const Projects = require('../models/Projects');

const projectsData = [
    {
        "title": "Calling models",
        "description": "You can import a model from another file although it must be exported inside curly brackets otherwise it will need to be distincly referenced.",
        "user_id": 1
    },
    {
        "title": "Creating a server through sequelize",
        "description": "a sequelize server needs to be defined and synced when the server is run when the app fires.",
        "user_id": 2
    },
    {
        "title": "Utilising a promise",
        "description": "A promise can be utilised with the next() function and catch() functions or it can be set as async and set to a variable if oyu desire.",
        "user_id": 1
    },
    {
        "title": "How to use handlebars",
        "description": "Simply create a file to store handlebars files in and reference them by passing a render function.. or something.",
        "user_id": 2
    },
    {
        "title": "Stay Secure!",
        "description": "Remember to always ensure that a .env file is setup to handle any secure information that can be run from the server and displayed to a user.",
        "user_id": 1
    }
];

const seedProjects = () => Projects.bulkCreate(projectsData);

module.exports = seedProjects;