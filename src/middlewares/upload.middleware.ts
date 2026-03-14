import multer from 'multer';
import { Request } from 'express';
import { allowedMimes } from '../config/add-laptime.enums';

// Use memory storage instead of disk storage to allow processing before saving
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Nieprawidłowy typ pliku. Dozwolone: JPEG, JPG, PNG'));
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB limit in bytes
  },
  fileFilter: fileFilter
});