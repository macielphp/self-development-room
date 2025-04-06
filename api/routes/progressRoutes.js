import express from 'express'
import {
    getUserProgress,
    markLessonCompleted
} from '../controllers/progressController.js'

const router = express.Router();

router.get('/:userId', getUserProgress);
router.post('/', markLessonCompleted)

export default router;
