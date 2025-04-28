import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import { createLesson, getAllLessons, getLessonById, updateLesson, deleteLesson } from '../controllers/adminLessonController.js';

const router = express.Router();

router.post('/', authAdmin, createLesson);
router.get('/', authAdmin, getAllLessons);
router.get('/:id', authAdmin, getLessonById);
router.put('/', authAdmin, updateLesson);
router.delete('/', authAdmin, deleteLesson);

export default router;