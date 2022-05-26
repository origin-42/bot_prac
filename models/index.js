const Users = require('./Users');
const Projects = require('./Projects');
const Posts = require('./Posts');

Users.hasMany(Projects, {
  foreignKey: 'user_id',
});

Users.hasMany(Posts, {
  foreignKey: 'user_id',
});

Projects.belongsTo(Users, {
  foreignKey: 'user_id',
});

Posts.belongsTo(Users, {
  foreignKey: 'user_id',
})

Projects.hasMany(Posts, {
  foreignKey: 'projects_id',
})

Posts.belongsTo(Projects, {
  foreignKey: 'projects_id',
})

module.exports = { Users, Projects, Posts };