import express from 'express'
const router = express.Router();
import { loginAdmin, getAllAdmins } from '../controllers/adminController.js'
import authAdmin from '../middleware/authAdmin.js'

router.post('/login', authAdmin ,loginAdmin);
// 👇 Todas as rotas abaixo estão protegidas
router.get('/admins', authAdmin, getAllAdmins); // Exemplo de rota protegida

export default router;