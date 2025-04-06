import { pool } from '../db/db.js';

// GET /api/seasons
export const getAllSeasons = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM seasons ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching seasons:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/seasons/:seasonId/lessons
export const getLessonsWithQuestions = async (req, res) => {
  const { seasonId } = req.params;
  try {
    const lessonsQuery = `
      SELECT * FROM lessons
      WHERE season_id = $1
      ORDER BY lesson_order ASC;
    `;
    const lessonsResult = await pool.query(lessonsQuery, [seasonId]);
    const lessons = lessonsResult.rows;

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
  } catch (err) {
    console.error('Error fetching lessons:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
