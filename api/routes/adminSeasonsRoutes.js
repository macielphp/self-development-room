import express from 'express';
import authAdmin from '../middleware/authAdmin.js';
import {
  getAllSeason,
  getSeasonById,
  createSeason,
  updateSeason,
  deleteSeason
} from '../controllers/adminSeasonsController.js';

const router = express.Router();

router.get('/', authAdmin, getAllSeason);
router.get('/:id', authAdmin, getSeasonById);
router.post('/', authAdmin, createSeason);
router.put('/', authAdmin, updateSeason);
router.delete('/', authAdmin, deleteSeason);

export default router;