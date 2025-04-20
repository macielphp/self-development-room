import express from 'express'
const router = express.Router();
import { loginAdmin } from '../controllers/adminController.js'
import authAdmin from '../middleware/authAdmin.js'

router.post('/login',loginAdmin);
// 👇 Todas as rotas abaixo estão protegidas

export default router;