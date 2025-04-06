// api/controllers/questionController.js
import { pool } from '../db/db.js';

export const getQuestionsByLessonId = async (req, res) => {
  const { lessonId } = req.params;
  try {
    const questionsResult = await pool.query(
      'SELECT * FROM questions WHERE lesson_id = $1',
      [lessonId]
    );

    const questions = await Promise.all(
      questionsResult.rows.map(async (q) => {
        const alternativesResult = await pool.query(
          'SELECT * FROM alternatives WHERE question_id = $1',
          [q.id]
        );
        return {
          ...q,
          alternatives: alternativesResult.rows
        };
      })
    );

    res.json(questions);
  } catch (err) {
    console.error('Erro ao buscar perguntas:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
