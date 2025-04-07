import express from 'express';
import { getCorrectAlternativesByLessonId } from '../controllers/alternativeController.js';

const router = express.Router();

// GET /api/alternatives/correct/:lessonId
router.get('/correct/:lessonId', getCorrectAlternativesByLessonId);

export default router;
