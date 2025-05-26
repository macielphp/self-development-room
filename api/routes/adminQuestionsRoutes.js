import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import { getQuestionsByLesson, getQuestionById, createQuestion, updateQuestion, deleteQuestion } from '../controllers/adminQuestionsController.js';

const router = express.Router();

router.get('/lesson/:lessonId', authAdmin, getQuestionsByLesson);
router.get('/:id', authAdmin, getQuestionById);
router.post('/', authAdmin, createQuestion);
router.put('/:id', authAdmin, updateQuestion);
router.delete('/:id', authAdmin, deleteQuestion);



export default router;