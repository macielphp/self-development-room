import express from 'express'
import { getLessonById } from '../controllers/lessonController.js';

const router = express.Router();

router.get('/:id', getLessonById); //Get /api/lessons/:id

export default router