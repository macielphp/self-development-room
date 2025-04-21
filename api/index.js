import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import adminLangaugesRoutes from './routes/adminLanguagesRoutes.js'
dotenv.config();
import adminSeasonsRoutes from './routes/adminSeasonsRoutes.js'
import adminAuthRoutes from './routes/adminAuthRoutes.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/admin', adminAuthRoutes)
app.use('/admin/languages', adminLangaugesRoutes);
app.use('/admin/seasons', adminSeasonsRoutes)

app.listen(port, () => {
    console.log(`Server is on. port ${port}`);
});
