import express, { Request, Response } from 'express';
import logger from '@/util/logger';
const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// var fs = require('fs');

// const Algorithm = require('../../model/Algorithm');
import Problem from '../models/Problem';
import { describe } from 'node:test';

const filePath = '../Code/';

// Setup storage engine for multer
// const storage = multer.diskStorage({
//     destination: function (req: Request, res: Response, cb) {
//         cb(null, filePath); // Directory where files will be stored
//     },
//     filename: function (req: Request, file, cb) {
//         const uniqueSuffix = Date.now() + '-';
//         cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname); // Save file with a unique name
//     }
// });

// File upload middleware
// const upload = multer({ storage: storage });

/* GET problem listing. */
router.get('/', async (req: Request, res: Response) => {
    try{
        const problems = await Problem.find({}, 'title description level');

        res.json({
            success: true,
            problems: problems.map((p) =>({
                id: p._id,
                title: p.title,
                description: p.description,
                level: p.difficulty,
            })),
        });
    } catch (err) {
        logger.error(err);
        res.status(500).json({success: false, message: 'Server error'});
    }

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

// router.post('/upload', upload.single('file'), function(req: Request, res) {
//     try{
//         console.log(req.file);
//         const fileData = req.file.buffer.toString('utf-8');
//         console.log(filename);
//         console.log(new Date());

//         // const algorithm = new Algorithm({
//         //     lang: path.extname(file.originalname);
//         //     solution: String,
//         //     location: String,
//         //     date: Date
//         // });
//         res.redirect('/algorithms');
//     } catch (err) {
//         console.log(err);
//     }



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
// });

module.exports = router;