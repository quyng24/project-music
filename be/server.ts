import app from './app.ts'
import connectDB from './config/db.ts';
import dotenv from 'dotenv';
dotenv.config();
connectDB();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));