import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Setup storage engine for multer
const uploadDir = path.join(__dirname, "../../uploads");
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir); // Directory where files will be stored
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-';
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Save file with a unique name
    },
});

// File upload middleware
export const upload = multer({ storage: storage });