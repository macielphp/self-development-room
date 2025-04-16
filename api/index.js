import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes)

app.listen(port, () => {
    console.log(`Server is on. port ${port}`);
});