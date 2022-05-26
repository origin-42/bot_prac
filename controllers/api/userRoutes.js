const router = require('express').Router();
const { Users, Projects, Posts } = require('../../models');

// CREATE new Users
router.post('/', async (req, res) => {
  try {

    const dbUsersData = await Users.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username

      res.status(200).json(dbUsersData);
      
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
  
// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await Users.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/comment', async (req, res) => {

  try {

    const { comment, projectId, usernameData } = req.body
    const userData = await Users.findOne({
      where: {
        username: usernameData,
      },
    })
    const username = userData.get({ plain: true });

    const makeComment = await Posts.create({
      comment: comment,
      projects_id: projectId,
      user_id: username.id,
    });

    if (!makeComment) {
      res
        .status(400)
        .json({ message: 'Failed to create comment.' });
      return;
    };

    res
        .status(200)
        .json({ comment: makeComment, message: 'Comment created!' });

  } catch (err) {
    console.log(err)
  };
});

router.post('/projects', async (req, res) => {

  try {

    const { title, text, user } = req.body
    const createProject = await Projects.create({
      title: title,
      description: text,
      user_id: user,
    });

    if (!createProject) {
      res
        .status(400)
        .json({ message: 'Failed to create project.' });
      return;
    };

    res
        .status(200)
        .json({ comment: createProject, message: 'Project created!' });

  } catch (err) {
    console.log(err)
  }

})
  
// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;