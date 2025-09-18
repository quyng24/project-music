import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routerUser from './routers/user.router.ts';
import routerAuth from './routers/auth.router.ts';

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use('/api/users', routerUser);
app.use('/api/auth', routerAuth);

export default app;