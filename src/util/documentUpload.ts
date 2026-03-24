import multer from 'multer';

export const documentUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
}).single('document'); // <── field name from Postman
