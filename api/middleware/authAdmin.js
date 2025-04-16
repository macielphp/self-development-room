// api/middleware/authAdmin.js
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const authAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded; // agora você tem os dados do admin disponíveis nas rotas
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authAdmin;
