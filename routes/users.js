const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.status(200).json({msg: 'wtf'});
});

router.post('/signup', function(req, res) {
  User.find({email: req.body.email})
      .exec()
      .then(user => {          
          if(user.length >= 1) {
            return res.status(409).json({
                message: 'Email exists'
            });
          } else {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                  if(err) {
                      return res.status(500).json({
                          error: err
                      });
                  } else {
                      const user = new User({
                          username: req.body.username,
                          email: req.body.email,
                          password: hash,
                          isAdmin: false
                      });
                      user.save()
                          .then((result) => {
                              return res.status(201).json({
                                msg: result
                              });
                          })
                          .catch((err) => {
                              return res.status(500).json({
                                error: err
                              });
                          });
                  } 
              });
          }
      });
});

router.post('/login', (req, res) => {
    console.log(1111111)
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
          console.log(user);
            if(user == undefined) {
                return res.status(401).json({
                    message: 'User not exists'
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err) {
                        return res.status(401).json({
                            error: err
                        });
                    }
                    if(result) {
                        console.log(result);
                        const token = jwt.sign(
                            {
                                email: user.email,
                                userId: user._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: '1h'
                            }
                        );

                        return res.status(200).json({
                            message: 'Logged in successfully',
                            token: token
                        });
                    }
                });
            }
        })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
});

module.exports = router;
