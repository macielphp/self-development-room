import { pool } from '../db/db.js';

const getAllLanguages = async (req, res) => {
    try{
        const result = await pool.query("SELECT * FROM languages ORDER BY name");
        res.json(result.rows);
    } catch(err){
        res.status(500).json({ error: err.message })
    }
} 

const createLanguage = async (req, res) => {
    const { name } = req.body;
    try{
        await pool.query('INSERT INTO languages (name) VALUES ($1)', [name]);
        res.status(201).json({ message:'Language added successfully' });
    } catch(err){
        res.status(500).json({ error: err.message })
    }
};

const updateLanguage = async (req, res) => {
    const { oldName, newName } = req.body;
    try{
        await pool.query('UPDATE languages SET name = $1 WHERE name = $2', [newName, oldName]);
        res.json({ message: 'Language deleted successfully'  });
    } catch(err){
        res.status(500).json({ error: err.message })
    }
} 

const deleteLanguage = async (req, res) => {
    const { name } = req.body;
    try {
      await pool.query('DELETE FROM languages WHERE name = $1', [name]);
      res.json({ message: 'Language deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export {
    getAllLanguages,
    createLanguage,
    updateLanguage,
    deleteLanguage
  };