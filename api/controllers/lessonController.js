import { pool } from '../db/db.js';

export const getLessonById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM lessons WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lição não encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar lição:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
