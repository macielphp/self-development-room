// api/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import progressRoutes from './routes/progressRoutes.js';
import seasonsRoutes from './routes/seasonsRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/progress', progressRoutes);
app.use('/api/seasons', seasonsRoutes);

// Tests
app.get('/', (req, res) => {
  res.send('API is running!');
});
app.get('/api/ping', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
