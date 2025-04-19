import { pool } from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Admin existe?
        const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email' });
        }
    
        const admin = result.rows[0]
        
        // Senha fornecida é igual à do db?
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' })
        }
    
        // Gera token
        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ token, admin: {id: admin.id, email: admin.email, name: admin.name } });
    } catch (error){
        console.error('Error in signing in:', error);
        res.status(500).json({ message: 'Inner error server' });
    }
};
