import { pool } from '../db/db.js'

export const createLesson = async (req, res) => {
    try {
        const {season_id, title, lesson_content } = req.body;

        const { rows } = await pool.query(
            'SELECT MAX(lesson_order) AS last_order FROM lessons WHERE season_id = $1',
            [season_id]
        );

        const lastOrder = rows[0].last_order || 0;
        const newOrder = lastOrder + 1;

        await pool.query(
            'INSERT INTO lessons (season_id, title, lesson_content, lesson_order) VALUES ($1, $2, $3, $4)', [season_id, title, lesson_content, newOrder]
        );

        res.status(201).json({ message: 'Lesson created successfully' });
    } catch(error) {
        console.error('Error creating lesson:', error);
        res.status(500).json({error: 'Internal server Error'});
    }
};

// 📋 Get All Lessons
export const getAllLessons = async (req, res) => {
    try {
      const { rows } = await pool.query(`
        SELECT 
          lessons.id,
          lessons.title,
          lessons.lesson_content,
          lessons.lesson_order,
          seasons.title AS season_title
        FROM lessons
        JOIN seasons ON lessons.season_id = seasons.id
        ORDER BY lessons.lesson_order
      `);
  
      res.json(rows);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // 🔎 Get Lesson by ID
  export const getLessonById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const { rows } = await pool.query(`
        SELECT 
          lessons.id,
          lessons.title,
          lessons.lesson_content,
          lessons.lesson_order,
          seasons.title AS season_title
        FROM lessons
        JOIN seasons ON lessons.season_id = seasons.id
        WHERE lessons.id = $1
      `, [id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const getLessonsBySeason = async(req, res) => {
    try {
      const { seasonId } = req.params;

      const { rows } = await pool.query(`
        SELECT
          id, 
          title,
          lesson_order
        FROM lessons
        WHERE season_id = $1
        ORDER BY lesson_order
      `, [seasonId]);

      res.json(rows);
    } catch (error) {
      console.error('Error fetching lessons by season:', error);
      res.status(500).json({ error: 'Internal error' });
    }
  };

  // 📝 Update Lesson
  export const updateLesson = async (req, res) => {
    try {
      const { id, language_id, title, lesson_content, lesson_order } = req.body;
  
      await pool.query(`
        UPDATE lessons
        SET title = $1, lesson_content = $2, lesson_order = $3
        WHERE id = $4
          AND season_id IN (
            SELECT id FROM seasons WHERE language_id = $5
          )
      `, [title, lesson_content, lesson_order, id, language_id]);
  
      res.json({ message: 'Lesson updated successfully' });
    } catch (error) {
      console.error('Error updating lesson:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // ❌ Delete Lesson
  export const deleteLesson = async (req, res) => {
    try {
      const { id } = req.body;
  
      await pool.query('DELETE FROM lessons WHERE id = $1', [id]);
  
      res.json({ message: 'Lesson deleted successfully' });
    } catch (error) {
      console.error('Error deleting lesson:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };