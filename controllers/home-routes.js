const router = require('express').Router();
const { Projects, Users, Posts } = require('../models');
const withAuth = require('../utils/auth')

// Hitting home page renders current projects from database in order by post date DESC
router.get('/', async (req, res) => {
    try {

        const projectsData = await Projects.findAll({
            limit: 3, 
            order: [['updatedAt', 'DESC']],
            include: [
              {
                model: Users,
                attributes: ['username'],
              },
            ],
        });
        const projects = projectsData.map((project) => project.get({ plain: true }));

        res.status(200).render('main', { projects, loggedIn: req.session.loggedIn });

    } catch (err) {
        console.log(err)
    }
})

// If a post is clicked, I'm routed to see that post and its comments
router.get('/projects/:id', async (req, res) => {

  try {

    const projectsData = await Projects.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: [
            'id',
            'username',
          ],
        },
        {
          model: Posts,
          attributes: [
            'id',
            'comment',
            "projects_id",
            "user_id",
            "createdAt",
          ],
          include: [{
            model: Users,
            attributes: [
              "username",
            ]
          }]
        },
      ],
    });
    const project = projectsData.get({ plain: true })
    project.username = req.session.username;
    project.loggedIn = req.session.loggedIn;

    res.status(200).render('projects', project );

  } catch (err) {
      console.log(err);
  };
});

// Hitting dashboard to make posts/login page
router.get('/dashboard', withAuth, async (req, res) => {

  try {

    const userData = await Users.findOne({ 
      where: { 
      username: req.session.username,
    },
      attributes: { exclude: ['password'] }
    });
    const user = userData.get({ plain: true });
    const projectsData = await Projects.findAll({ 
      where: { user_id: user.id },
    });
    const projects = projectsData.map((project) => project.get({ plain: true }))

    res.status(200).render('dashboard', { projects, id: user.id, user: req.session.username, loggedIn: req.session.loggedIn } );

  } catch (err) {
    console.log(err)
  }

})

router.get('/dashboard/projects/:id', async (req, res) => {

  try {

    const projectData = await Projects.findOne({ 
      where: { 
      id: req.params.id,
    },
      include: {
        model: Users,
        where: {
          username: req.session.username
        },
        attributes: { exclude: ['password'] }
      }
    });
    const project = projectData.get({ plain: true })

    project.user = req.session.username;
    project.loggedIn = req.session.loggedIn;

    res.status(200).render('user-projects', project );

  } catch (err) {
    console.log(err)
  }

})

// Bot routes

const botResponses = ["Why are you asking me this?", "Ok but did you know sunshine is bright?.. huh?", "I'm but a humble service bot. I know not.", "Beep boop", "Ok but what if we didn't do that?", "I can press buttons too!", "Stop that", "Weeeeeeeee"];


router.post('/', async (req, res) => {

    try {

        const randomize = Math.floor(Math.random() * botResponses.length);
        let userQuery = req.body.userRequest;
        let botResponse;
        let username = req.session.username;

        if (userQuery === "I want to create a new medication.") {
            res.status(200).render('dashboard');
        } else if (userQuery === "I need to check the expiry dates of my medications.") {
            res.status(200).render('projects');
        } else if (userQuery === "I need to update my medication information.") {
            res.status(200).render('user-projects');
        } else if (userQuery === "I need to login") {
            res.status(200).render('login');
        } else {
            botResponse = botResponses[randomize];
            const queries = { botResponse, userQuery, username };
            res.status(200).json(queries);
        }

    } catch (err) {
        console.log(err);
    }

})


// Bot route

router.put('/dashboard/projects/:id', async (req, res) => {

  try {

    const { title, description } = req.body

    const objectToUpdate = {
      title: title,
      description: description,
    }
    
    const update = await Projects.update(objectToUpdate, { where: { id: req.params.id}})

    if (!update) {
      res
        .status(400)
        .json({ message: 'Failed to update project.' });
      return;
    };

    res
        .status(200)
        .json({ comment: update, message: 'Project created!' });

  } catch (err) {
    console.log(err)
  }

})

router.delete('/dashboard/projects/:id', async (req, res) => {

  try {
    
    const deleted = await Projects.destroy({ 
      where: { 
      id: req.params.id,
      },
    });

    if (!deleted) {
      res
        .status(400)
        .json({ message: 'Failed to delete project.' });
      return;
    };

    res
        .status(200)
        .json({ comment: deleted, message: 'Project removed!' });

  } catch (err) {
    console.log(err)
  }

})


// hitting login page returns to home page or login depending on signin status
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;