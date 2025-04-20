import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import {
    getAllLanguages, 
    createLanguage, 
    updateLanguage, 
    deleteLanguage
} from '../controllers/adminLanguagesController.js';

const router = express.Router();

router.get('/', authAdmin ,getAllLanguages);
router.post('/', authAdmin, createLanguage);
router.put('/', authAdmin, updateLanguage);
router.delete('/',authAdmin, deleteLanguage)

export default router;