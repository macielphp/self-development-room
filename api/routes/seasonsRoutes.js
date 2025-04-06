import express from 'express';
import {
    getAllSeasons,
    getLessonsWithQuestions
} from '../controllers/seasonsController.js';

const router = express.Router();

router.get('/', getAllSeasons);
router.get('/:seasonId/lessons', getLessonsWithQuestions);

export default router;