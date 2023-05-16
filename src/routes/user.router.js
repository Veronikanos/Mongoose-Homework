import { Router } from 'express';
import {
  createUser,
  getUsers,
  updateUserById,
  deleteUserById,
  getUserByIdWithArticles,
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter
  .get('/', getUsers)
  .get('/:userId', getUserByIdWithArticles)
  .post('/', createUser)
  .put('/:userId', updateUserById)
  .delete('/:userId', deleteUserById);

export default userRouter;
