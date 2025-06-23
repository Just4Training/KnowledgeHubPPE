import { Request, Response } from 'express';
import logger from '@/util/logger';
import Problem from '@/models/Problem';

import { describe } from 'node:test';

const filePath = '../Code/';

/* GET problem listing. */
export const getProblems = async (req: Request, res: Response) => {
    try {
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
};

export const getProblemById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const problem = await Problem.findById(id);
        if(!problem) {
            res.status(404).json({ message: 'Problem not exist!' });
            return;
        }
        res.json({ problem });
    } catch (err) {
        console.log(err);
        logger.error(err);
        res.status(500).json({ error: 'Fail to fetch problem' });
    }
};

export const createProblem = async (req: Request, res: Response) => {
    try {
        const { title, description, difficulty } = req.body;
        // const file = req.filter;
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

        const newProblem = new Problem({ title, description, difficulty });
        await newProblem.save();
        res.status(201).json(newProblem);
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Fail to fetch problem' });
    }
};

export const updateProblem = async (req: Request, res: Response) => {
    try {
        const updated = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
        res.status(404).json({ message: 'Problem not found' });
        return;
    }
        res.json(updated);
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to update problem' });
    }
};

export const deleteProblem = async (req: Request, res: Response) => {
    try {
        const deleted = await Problem.findByIdAndDelete(req.params.id);
    if (!deleted) {
        res.status(404).json({ message: 'Problem not found' });
        return;
    }
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: 'Failed to delete problem' });
    }
};

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