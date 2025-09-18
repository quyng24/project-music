import express from 'express';
const routerAuth = express.Router();
import { register, login, tokenInfoUser, logout } from '../controllers/auth.controller.ts';
import { authMiddleware } from '../middleware/auth.middleware.ts';

routerAuth.post('/register', register);
routerAuth.post('/login', login);
routerAuth.get('/me', authMiddleware, tokenInfoUser);
routerAuth.post('/logout', logout);

export default routerAuth;