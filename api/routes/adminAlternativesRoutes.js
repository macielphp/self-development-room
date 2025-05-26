import express from 'express';
import authAdmin from './../middleware/authAdmin.js';
import { getAlternativesByQuestion, createAlternatives, setCorrectAlternative, deleteAlternative, updateQuestion } from '../controllers/adminAlternativesController.js';

const router = express.Router();

// Nested routes in question for alternatives
router.get('/question/:questionId', authAdmin, getAlternativesByQuestion);
router.post('/', authAdmin, createAlternatives);
router.put('/:id', authAdmin, updateQuestion)
router.put('/:id/correct', authAdmin, setCorrectAlternative);
router.delete('/:id', authAdmin, deleteAlternative);

export default router;