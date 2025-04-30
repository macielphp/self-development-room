import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import { getQuestionsByLesson, getQuestionsById, createQuestion, updateQuestion, deleteQuestion } from '../controllers/adminQuestionsController.js';
import { getAlternativesByQuestion, createAlternatives, setCorrectAlternative, deleteAlternative } from '../controllers/adminAlternativesController.js';
const router = express.Router();

router.get('/questions/lesson/:lessonId', authAdmin, getQuestionsByLesson);
router.get('/questions/:id', authAdmin, getQuestionsById);
router.post('/questions', authAdmin, createQuestion);
router.put('/questions/:id', authAdmin, updateQuestion);
router.delete('/questions/:id', authAdmin, deleteQuestion);

router.get('/alternatives/question/:questionId', authAdmin, getAlternativesByQuestion);
router.post('/alternatives', authAdmin, createAlternatives);
router.put('/alternatives/:id', authAdmin, setCorrectAlternative);
router.delete('/alternatives/:id', authAdmin, deleteAlternative);

export default router;