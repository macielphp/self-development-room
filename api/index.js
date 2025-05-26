import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authAdmin from './middleware/authAdmin.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import adminLangaugesRoutes from './routes/adminLanguagesRoutes.js'
import adminSeasonsRoutes from './routes/adminSeasonsRoutes.js'
import adminLessonRoutes from './routes/adminLessonsRoutes.js'
import adminQuestionsRoutes from './routes/adminQuestionsRoutes.js'
import adminAlternativesRoutes from './routes/adminAlternativesRoutes.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/admin', adminAuthRoutes)

app.use('/admin/languages', authAdmin, adminLangaugesRoutes);
app.use('/admin/seasons', authAdmin, adminSeasonsRoutes);
app.use('/admin/lessons', authAdmin, adminLessonRoutes);
app.use('/admin/questions', authAdmin, adminQuestionsRoutes);
app.use('/admin/alternatives', authAdmin, adminAlternativesRoutes);

app.listen(port, () => {
    console.log(`Server is on. port ${port}`);
});
