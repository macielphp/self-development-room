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

router.get('/', getAllSeason);
router.get('/:id', getSeasonById);
router.post('/', createSeason);
router.put('/', updateSeason);
router.delete('/', deleteSeason);

export default router;