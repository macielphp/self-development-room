// api/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import progressRoutes from './routes/progressRoutes.js';
import seasonsRoutes from './routes/seasonsRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import alternativeRoutes from './routes/alternativeRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/progress', progressRoutes);
app.use('/api/seasons', seasonsRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/alternatives', alternativeRoutes);


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
