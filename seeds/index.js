const sequelize = require('../config/connection');

const seedUsers = require('./userData');
const seedProjects = require('./projectData');
const seedPosts = require('./postsData');

const seedAll = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(function(){
      return sequelize.sync({ force: true });
  })
  .then(function(){
      return sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
  })
  .then(function(){
      console.log('Database synchronised.');
  }, function(err){
      console.log(err);
  });
  
  await seedUsers();
  
  await seedProjects();

  await seedPosts();

  process.exit(0);
};

seedAll();
