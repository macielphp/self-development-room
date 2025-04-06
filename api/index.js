// api/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// PostgreSQL config
const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

// Test
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Test route
app.get('/api/ping', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Example: Get all seasons
app.get('/api/seasons', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM seasons ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching seasons:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/seasons/:seasonId/lessons', async (req, res) => {
  const seasonId = req.params.seasonId;
  try {
    const lessonsQuery = `
      SELECT * FROM lessons
      WHERE season_id = $1
      ORDER BY lesson_order ASC;
    `;
    const lessonsResult = await pool.query(lessonsQuery, [seasonId]);
    const lessons = lessonsResult.rows;

    // Now fetch questions and alternatives for each lesson
    const lessonsWithQuestions = await Promise.all(
      lessons.map(async (lesson) => {
        const questionsQuery = `
          SELECT q.id as question_id, q.text as question_text,
                 a.id as alternative_id, a.text as alternative_text, a.is_correct
          FROM questions q
          JOIN alternatives a ON q.id = a.question_id
          WHERE q.lesson_id = $1;
        `;
        const questionsResult = await pool.query(questionsQuery, [lesson.id]);

        // Group alternatives by question
        const questionMap = {};
        questionsResult.rows.forEach(row => {
          if (!questionMap[row.question_id]) {
            questionMap[row.question_id] = {
              id: row.question_id,
              text: row.question_text,
              alternatives: []
            };
          }
          questionMap[row.question_id].alternatives.push({
            id: row.alternative_id,
            text: row.alternative_text,
            isCorrect: row.is_correct
          });
        });

        return {
          ...lesson,
          questions: Object.values(questionMap)
        };
      })
    );

    res.json(lessonsWithQuestions);

  } catch(err){
    console.error('Error fetching lessons:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
