import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simples: em produção use banco e hash
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign(
      { username: 'admin', role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
