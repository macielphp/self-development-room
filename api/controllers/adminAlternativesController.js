import { pool } from '../db/db.js';

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

export const getLessonBySeason = async (req, res) => {
  try {
    const { seasonId } = req.params;
    const { rows } = await pool.query(`
      SELECT 
        id,
        title,
        lesson_order
      FROM lessons
      WHERE season_id = $1
      ORDER BY lesson_order;
    `, [seasonId]);
    res.json(rows);   
  } catch(error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createAlternatives = async (req, res) => {
    const { question_id, alternatives } = req.body; // [{ alternative, correct }]
    try {
      const insertValues = alternatives.map((alt, i) => `($1, $${i * 2 + 2}, $${i * 2 + 3})`).join(', ');
      const params = [question_id, ...alternatives.flatMap(a => [a.alternative, a.correct])];
  
      const result = await pool.query(`
        INSERT INTO alternatives (question_id, alternative, correct)
        VALUES ${insertValues};
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
      `, [id]);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar alternativa.' });
    }
  };
  
export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, alternatives } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Atualiza pergunta
    await client.query(`
      UPDATE questions SET question = $1 WHERE id = $2
    `, [question, id]);

    // Atualiza alternativas
    for (const alt of alternatives) {
      await client.query(`
        UPDATE alternatives SET alternative = $1, correct = $2 WHERE id = $3
      `, [alt.alternative, alt.correct, alt.id]);
    }

    await client.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Erro ao atualizar pergunta e alternativas.' });
  } finally {
    client.release();
  }
};


export  const deleteAlternative = async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const questionResult = await client.query('SELECT question_id FROM alternatives WHERE id = $1',
            [id]
      );
      if (questionResult.rows.length === 0) {
        throw new Error('Alternative not found.');
      }

      const questionId = questionResult.rows[0].question_id;

      await client.query(
        'DELETE FROM questions WHERE question_id = $1',
        [questionId]
      );

      await client.query('COMMIT');
      res.sendStatus(204);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error deleting question:', error);
      res.status(500).json({ error: 'Erro ao deletar alternativa.' });
    } finally {
      client.release();
    }
  };
  