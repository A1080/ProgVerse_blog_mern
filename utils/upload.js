import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://${username}:${password}@blogapp.4ubpqaw.mongodb.net/?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    const match = ['image/png', 'image/jpg'];

    if (match.indexOf(file.mimetype) === -1) {
      // to remove the duplicate name we add date on it
      return `${Date.now()}-blog-${file.originalname}`;
    }
    // console.log("abhishke");
    return {
      bucketName: 'photos',
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
