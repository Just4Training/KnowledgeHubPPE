var express = require('express');
var router = express.Router();
var Algorithm = require('../model/Algorithm');
var Problem = require('../model/Problem');

const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    problemName: String,
    description: String,
    leetcode: Number,
    topic: String,
    level: String
}, { collection: 'test'});

const ProblemModel = mongoose.model('Problem', problemSchema, 'test');

/* GET algorithm listing. */
router.get('/', async function(req, res, next) {
    const list = await ProblemModel.find({});
    // ids = [];
    // list.forEach((obj) => ids.push(obj['author']));
    // console.log(ids);

    res.render('algorithm', {title: 'Algorithm', mlist: list});
});

router.post('/', async function(req, res, next) {
    const problem = new Problem({
        problemName: req.body.algorname,
        description: req.body.prolang
    });

    const problemObj = new ProblemModel({
        problemName: 'problem.problemName',
        description: 'problem.description',
        leetcode: 9999
    });

    await problemObj
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling post request to /algorithm',
                createAlgorithm: result,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;