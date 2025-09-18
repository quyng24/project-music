import express from 'express';
const routerUser = express.Router();
import {getUsers, createUser, getUserById, deleteUser, updateUser} from '../controllers/user.controller.ts';

routerUser.get('/', getUsers);
routerUser.post('/', createUser);
routerUser.get('/:id', getUserById);
routerUser.delete("/:id", deleteUser);
routerUser.put("/:id", updateUser);


export default routerUser;