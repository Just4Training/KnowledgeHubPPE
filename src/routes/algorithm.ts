var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
// var fs = require('fs');

const Algorithm = require('../../model/Algorithm');
const Problem = require('../../model/Problem');

const filePath = '../Code/';

// Setup storage engine for multer
const storage = multer.diskStorage({
    destination: function (req: Request, res, cb) {
        cb(null, filePath); // Directory where files will be stored
    },
    filename: function (req: Request, file, cb) {
        const uniqueSuffix = Date.now() + '-';
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname); // Save file with a unique name
    }
});

// File upload middleware
const upload = multer({ storage: storage });

/* GET algorithm listing. */
router.get('/', async function(req: Request, res, next) {
    const problems = await Problem.find({});
    probList = [];
    problems.forEach((obj) => {
        let prob = {id: obj['_id'], problemName: obj['problemName'], description: obj['description'], level:obj['level']};
        probList.push(prob);
    });

    res.render('algorithm', {problems: probList});
});

router.get('/:problemId', async function(req: Request, res) {
    const id = req.params.problemId;
    const problem = await Problem.findById(id).lean();
    res.render('problem', { problem });
});

router.post('/', async function(req: Request, res) {
    console.log(req.body);
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

router.post('/upload', upload.single('file'), function(req: Request, res) {
    try{
        console.log(req.file);
        const fileData = req.file.buffer.toString('utf-8');
        console.log(filename);
        console.log(new Date());

        // const algorithm = new Algorithm({
        //     lang: path.extname(file.originalname);
        //     solution: String,
        //     location: String,
        //     date: Date
        // });
        res.redirect('/algorithms');
    } catch (err) {
        console.log(err);
    }



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