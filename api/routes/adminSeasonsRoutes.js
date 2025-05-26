import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import {
  getAllSeason,
  getSeasonsByLanguageId,
  createSeason,
  updateSeason,
  deleteSeason
} from '../controllers/adminSeasonsController.js';

const router = express.Router();

router.get('/', authAdmin, getAllSeason);
router.get('/by-language/:id', authAdmin, getSeasonsByLanguageId);
router.post('/', authAdmin, createSeason);
router.put('/', authAdmin, updateSeason);
router.delete('/', authAdmin, deleteSeason);

export default router;