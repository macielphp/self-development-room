import { pool } from '../db/db.js'

// 📋 Buscar todas as temporadas com o nome do idioma
const getAllSeason = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                seasons.id,
                seasons.title,
                seasons.language_id, -- ADICIONE ISSO
                languages.name AS language_name
            FROM seasons
            JOIN languages ON seasons.language_id = languages.id
            ORDER BY seasons.id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// 🔎 Buscar uma temporada específica
const getSeasonsByLanguageId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        seasons.id,
        seasons.title,
        seasons.language_id,
        languages.name AS language_name
      FROM seasons
      JOIN languages ON seasons.language_id = languages.id
      WHERE languages.id = $1
    `, [id]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Criar uma nova temporada
const createSeason = async (req, res) => {
    const { title, language_id } = req.body;
    try {
      await pool.query(`
        INSERT INTO seasons (title, language_id)
        VALUES ($1, $2)
      `, [title, language_id]);
      res.status(201).json({ message: 'Season created successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // 📝 Atualizar uma temporada
const updateSeason = async (req, res) => {
    const { id, newTitle } = req.body;
    try {
        await pool.query(`
        UPDATE seasons
        SET title = $1
        WHERE id = $2
        `, [newTitle, id]);
        res.json({ message: 'Season updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
  
// ❌ Excluir uma temporada
const deleteSeason = async (req, res) => {
const { id } = req.body;
try {
    await pool.query('DELETE FROM seasons WHERE id = $1', [id]);
    res.json({ message: 'Season deleted successfully' });
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

export {
    getAllSeason,
    getSeasonsByLanguageId,
    createSeason,
    updateSeason,
    deleteSeason
};
  