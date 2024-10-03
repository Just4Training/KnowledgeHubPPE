var express = require('express');
var router = express.Router();

const User = require('../model/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async function(req, res, next) {
  console.log(req.body);

  // const user = new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password,
  //   isAdmin: true
  // });

  const user = new User({
    username: 'Admin',
    email: 'test@test.com',
    password: '123456',
    isAdmin: true
  });

  console.log(user);

  await user.save()
          .then((result) => {
            console.log(result);
            return res.status(201).json({
              msg: result
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              error: err
            });
          });
});

module.exports = router;
