// import express, { Request, Response } from 'express';
// import { upload } from '@/util/upload';

// const router = express.Router();

// router.post("/upload", upload.single("file"), (req: Request, res: Response) => {
//     try{
//         if(!req.file) {
//             res.status(400).send("No file uploaded");
//         }
//         res.status(200).json({
//             message: "File uploaded successfully",
//             filename: req.file.filename,
//             path: req.file.path,
//         });
//     } catch (err) {

//     }
// });