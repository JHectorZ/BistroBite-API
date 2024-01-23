import { getUsers, getUserByPk, login, getUsersByParams, createUser, updateUser } from '../controllers/user.controllers'
import { validateToken } from '../../config/middlewares/token.middleware';
import { Router } from "express";

const userRouter = Router()

userRouter.get('/', [validateToken, getUsers])
userRouter.get('/params', [validateToken, getUsersByParams])
userRouter.get('/:id', [validateToken, getUserByPk])
userRouter.post('/', [validateToken, createUser])
userRouter.put('/', [validateToken, updateUser])
userRouter.post('/login', login)

export default userRouter;
