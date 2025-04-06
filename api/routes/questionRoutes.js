import express from 'express';
import { getQuestionsByLessonId } from '../controllers/questionController.js';

const router = express.Router();

router.get('/byLesson/:lessonId', getQuestionsByLessonId); // GET /api/questions/byLesson/:lessonId

export default router;
