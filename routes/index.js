var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');

var url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'mydb';
const db = client.db(dbName);
const collection = db.collection('test');

/* GET home page. */
router.get('/', async function(req, res, next) {
  await client.connect();
  console.log("db connected");
  let tb = await collection.find({}).toArray();
  // console.log(tb);

  res.render('index', { title: 'HomePage for Bobby', condition: true, myList: tb });
});

router.get('/algorithm', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST Database API*/
router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };


  collection.insertOne(item, function(err, result) {
    console.log('inserted =>', result);
    db.close();
  });

  res.redirect('/');
}); 

module.exports = router;
