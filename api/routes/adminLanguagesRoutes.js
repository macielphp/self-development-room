import express from 'express';
import {
    getAllLanguages, 
    createLanguage, 
    updateLanguage, 
    deleteLanguage
} from '../controllers/adminLanguagesController.js';

const router = express.Router();

router.get('/', getAllLanguages);
router.post('/', createLanguage);
router.put('/', updateLanguage);
router.delete('/', deleteLanguage)

export default router;