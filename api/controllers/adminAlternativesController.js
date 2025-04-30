import { pool } from '../db.js';

export const getAlternativesByQuestion = async (req, res) => {
    const { questionId } = req.params;
    try {
      const result = await pool.query(`
        SELECT id, alternative, correct
        FROM alternatives
        WHERE question_id = $1
        ORDER BY id;
      `, [questionId]);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar alternativas.' });
    }
  };

export const createAlternatives = async (req, res) => {
    const { question_id, alternatives } = req.body; // [{ alternative, correct }]
    try {
      const insertValues = alternatives.map((alt, i) => `($1, $${i * 2 + 2}, $${i * 2 + 3})`).join(', ');
      const params = [question_id, ...alternatives.flatMap(a => [a.alternative, a.correct])];
  
      const result = await pool.query(`
        INSERT INTO alternatives (question_id, alternative, correct)
        VALUES ${insertValues}
        RETURNING *;
      `, params);
  
      res.status(201).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar alternativas.' });
    }
};
  
export const setCorrectAlternative = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(`
        WITH target AS (
          SELECT question_id FROM alternatives WHERE id = $1
        )
        UPDATE alternatives
        SET correct = CASE
          WHEN id = $1 THEN TRUE
          ELSE FALSE
        END
        WHERE question_id = (SELECT question_id FROM target)
        RETURNING *;
      `, [id]);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar alternativa.' });
    }
  };
  
export  const deleteAlternative = async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query(`DELETE FROM alternatives WHERE id = $1;`, [id]);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar alternativa.' });
    }
  };
  