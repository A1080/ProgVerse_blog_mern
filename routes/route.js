import express from 'express';
import { signupUser ,loginUser} from '../controller/user-controller.js';
import { uploadImage ,getImage} from '../controller/image-controller.js';
import upload from '../utils/upload.js';
import { createPost, getAllPosts,getPost,updatePost,deletePost } from '../controller/post-controller.js';
import { newComment,getComments,deleteComment } from '../controller/comment-controller.js';
import { authenicateToken } from '../controller/jwt-controller.js';
const router = express.Router();



// router.post(api_end_point,middleware, calling function for api/callback function)
router.post('/signup',signupUser);
// for login
router.post('/login',loginUser);
// to upload image
router.post('/file/upload',upload.single('file'),uploadImage);

// GET  request for image
// file is route/endpoint
router.get('/file/:filename',getImage);

router.post('/create',authenicateToken,createPost);
router.get('/posts',authenicateToken,getAllPosts);
router.get('/post/:id',authenicateToken,getPost);
router.put('/update/:id',authenicateToken,updatePost);
router.delete('/delete/:id',authenicateToken,deletePost);
router.post('/comment/new',authenicateToken,newComment);
router.get('/comments/:id',authenicateToken,getComments);
router.delete('/comment/delete/:id',authenicateToken,deleteComment);
export default router;