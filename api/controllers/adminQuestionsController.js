import { pool } from '../db/db.js'

export const getQuestionsByLesson = async(req, res) => {
    const { lessonId } = req.params;
    try{
        const result = await pool.query(`
            SELECT q.id, q.question, l.title AS lesson_title
            FROM questions q
            JOIN lessons l ON q.lesson_id = l.id
            WHERE q.lesson_id = $1
            ORDER BY q.id;
        `, [lessonId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar perguntas.' })
    }
}

export const getQuestionsById = async(req, res) => {
    const { id } = req.params;
    try{
        const result = await pool.query(`
            SELECT q.id, q.question, l.title AS lesson_title
            FROM questions q
            JOIN lessons l ON q.lesson_id = l.id
            WHERE q.id = $1;
        `, [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar perguntas.' })
    }
};

export const createQuestion = async(req, res) => {
    const { lesson_id, question } = req.body;
    try{
        const result = await pool.query(`
            INSERT INTO questions (lesson_id, question)
            VALUES ($1, $2)
        `, [lesson_id, question])
        res.status(201).json(result.rows[0]);
    } catch(error){
        res.status(500).json({ error: 'Erro ao criar pergunta.' })
    }
}

export const updateQuestion = async(req, res) => {
    const { id } = req.params; 
    const { question } = req.body;
    try {
        const result = await pool.query(`
            UPDATE questions SET question = $1
            WHERE id = $2
        `, [question, id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar pergunta.' })
    }
}

export const deleteQuestion = async(req, res) => {
    const { id } = req.params;
    try{
        await pool.query(`DELETE FROM questions WHERE id = $1;`, [id]);
        res.status(204);
    } catch(error) {
        res.status(500).json({ error: 'Erro ao deletar pergunta.' });
    }
};

