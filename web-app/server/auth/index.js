const router = require('express').Router();
const User = require('../db/models/User');
const Article = require('../db/models/Article');
module.exports = router;

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email);
        res.status(401).send('Wrong username and/or password');
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email);
        res.status(401).send('Wrong username and/or password');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    }) //.then(() => res.redirect(originalArticleUrl))
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)));
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));

router.delete('/', (req, res, next) => {
  // Steps: 1. delete user's articles / 2. delete user / 3. delete user session
  // Note: deleting articles manually because 'cascading' delete of User didn't
  // work as planned - still got FK constraint error.
  Article.destroy({
    where: {
      userId: req.user.id
    },
    force: true // to override 'paranoid' deletion setting in model defintion
  })
    .then(() => {
      User.destroy({
        where: {
          id: req.user.id
        }
      }).catch(next);
    })
    .then(() => {
      req.logout();
      req.session.destroy();
      res.sendStatus(202);
    })
    .catch(next);
});
