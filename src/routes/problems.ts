import express from 'express';
import { getProblems, getProblemById, createProblem, updateProblem, deleteProblem } from '@/controllers/problemController';

const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// var fs = require('fs');

// const Algorithm = require('../../model/Algorithm');
// import { describe } from 'node:test';

//const filePath = '../Code/';

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
router.get('/', getProblems);

/* GET problem by id. */
router.get('/:id', getProblemById);

/* POST create problem. */
router.post('/', createProblem);

/* UPDATE problem */
router.put('/:id', updateProblem);

/* DELETE problem */
router.delete('/:id', deleteProblem);

export default router;