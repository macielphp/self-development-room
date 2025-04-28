import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import adminLangaugesRoutes from './routes/adminLanguagesRoutes.js'
import adminSeasonsRoutes from './routes/adminSeasonsRoutes.js'
import authAdmin from './middleware/authAdmin.js'; // Middleware de autenticação para proteger o painel
import adminLessonRoutes from './routes/adminLessonsRoutes.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rota de autenticação do admin
app.use('/admin', adminAuthRoutes)

// Rotas do painel admin
app.use('/admin/languages', authAdmin, adminLangaugesRoutes);
app.use('/admin/seasons', authAdmin, adminSeasonsRoutes);
app.use('/admin/lessons', authAdmin, adminLessonRoutes);

app.listen(port, () => {
    console.log(`Server is on. port ${port}`);
});
