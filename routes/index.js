var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HomePage for Bobby Zhu', condition: true, myList: [1, 2, 3, 4, 5, 6, 7, 8, 9] });
});

module.exports = router;
