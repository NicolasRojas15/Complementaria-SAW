const express = requiere('express');
const pool = requiere ('./db');

const router = express.Router();

//obtencion de datos

router.get('/', async (req, res) => {
    try {
        const [rpws] = await pool.query('SELECT * FROM data');
        res,json({data: rows, message: 'Datos Recuperados Correctamente'});
    } catch (err) {
        res.status(500).json({message: 'Error al Recuperar Los Datos'});
    }
});

// post
router.post('/', async (req, res) => {
    const {field1, field2} = req.body;

    if (!field1 || !field2) {
        return res.status(400).json({message: 'Datos Requeridos'});
    }

    try {
        const [result] = await pool.query('INSERT INTO data (field1, field2) VALUES (?, ?)', [field1, field2]);
        res.json({insertID: result.insertId, message: 'Registro insertado correctamente'});
    } catch (err) {
        res.status(500).json({message: 'Error al insertar el registro'});
    }
});

//patch
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const {field1, field2} = req.body;

    if (!field1 || !field2) {
        return res.status(400).json({message: 'Datos Requeridos'});
    }

    try {
        const [result] = await pool.query('UPDATE data SET field1 = ?, Field2 = ? WHERE id = ?', [field1, field2, id]);
        res.json({data:result, message: 'Registro Actualizado con exito'});
    } catch (err) {
        res.status(500).json({message: 'Error al actuaizar el registro'});
    }
});

// delete
router.delete('/'), async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM data WHERE id = ?', [id]);
        res.json({data: result, message: 'Registro Eliminado con exito'});
    } catch (err) {
        res.status(500).json({message: 'Error al eliminar el registro'});
    }
};

module.exports = router;