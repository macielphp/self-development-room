// controllers/progressController.js
import { pool } from '../db/db.js';

export const getUserProgress = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      'SELECT lesson_id FROM user_lesson_progress WHERE user_id = $1 AND completed = TRUE',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const markLessonCompleted = async (req, res) => {
  const { user_id, lesson_id } = req.body;
  try {
    await pool.query(
      `
      INSERT INTO user_lesson_progress (user_id, lesson_id, completed)
      VALUES ($1, $2, TRUE)
      ON CONFLICT (user_id, lesson_id)
      DO UPDATE SET completed = TRUE;
      `,
      [user_id, lesson_id]
    );
    res.status(200).json({ message: 'Lesson marked as completed' });
  } catch (err) {
    console.error('Error updating progress:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
