import { pool } from '../db/db.js';

export const getCorrectAlternativesByLessonId = async (req, res) => {
  const { lessonId } = req.params;

  try {
    const result = await pool.query(
      `SELECT a.id, a.question_id, a.text 
       FROM alternatives a
       JOIN questions q ON a.question_id = q.id
       WHERE q.lesson_id = $1 AND a.is_correct = true`,
      [lessonId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar alternativas corretas:', err);
    res.status(500).json({ error: 'Erro ao buscar alternativas corretas' });
  }
};
