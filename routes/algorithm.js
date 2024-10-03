var express = require('express');
var router = express.Router();
const multer = require('multer');
var fs = require('fs');

// var Algorithm = require('../model/Algorithm');
const Problem = require('../model/Problem');

const path = '../Code/';

// Setup storage engine for multer
const upload = multer({ dest: path});
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Directory where files will be stored
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Save file with a unique name
//     }
// });

// File upload middleware
// const upload = multer({ storage: storage });

/* GET algorithm listing. */
router.get('/', async function(req, res, next) {
    const problems = await Problem.find({});
    probList = [];
    problems.forEach((obj) => {
        let prob = {id: obj['_id'], problemName: obj['problemName'], description: obj['description'], level:obj['level']};
        probList.push(prob);
    });

    res.render('algorithm', {problems: probList});
});

router.get('/:problemId', async function(req, res) {
    const id = req.params.problemId;
    const problem = await Problem.findById(id).lean();
    res.render('problem', { problem });
});

router.post('/', async function(req, res) {
    const problem = new Problem({
        problemName: req.body.problemName,
        description: req.body.description,
        leetcode: req.body.leetcode,
        topic: req.body.topic
    });

    // const fName = path.concat(problem.problemName).concat('.txt');

    // fs.writeFileSync(fName, problem.description, (err) => {
    //     if(err) {
    //         throw err;
    //     }
    //     console.log('Saved');
    // });

    await problem
        .save()
        .then((result) => {
            console.log(result);
            // res.status(201).json({
            //     message: 'Handling post request to /algorithm',
            //     createAlgorithm: result,
            // });
            res.redirect('/algorithms');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/upload', upload.single('file'), async function(req, res) {
    console.log(111111);
    try{
        console.log(req.file);
        res.status(200).json({data: req.file});
    } catch (err) {
        console.log(err);
    }

    // const problem = new Problem({
    //     problemName: req.body.problemName,
    //     description: req.body.description,
    //     leetcode: req.body.leetcode,
    //     topic: req.body.topic
    // });

    // const fName = path.concat(problem.problemName).concat('.txt');

    // fs.writeFileSync(fName, problem.description, (err) => {
    //     if(err) {
    //         throw err;
    //     }
    //     console.log('Saved');
    // });

    // await problem
    //     .save()
    //     .then((result) => {
    //         console.log(result);
    //         // res.status(201).json({
    //         //     message: 'Handling post request to /algorithm',
    //         //     createAlgorithm: result,
    //         // });
    //         res.redirect('/algorithms');
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         });
    //     });
});

module.exports = router;