import express from 'express'
const router = express.Router();
import { loginAdmin, getAllAdmins } from '../controllers/adminController.js'
import authAdmin from '../middleware/authAdmin.js'

router.post('/login',loginAdmin);
// 👇 Todas as rotas abaixo estão protegidas

export default router;