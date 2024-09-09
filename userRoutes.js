const express = require ('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
require('dotenv').config();


const router = express.Router();

router.post('/acceso', async (req, res) =>{
    const {usuario, clave} = req.body;

    if (!usuario || !clave){
        return res.status(400).json({message: 'Usuario y Clave Requeridos'});
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        const user = rows[0];

        if (user && await bycrypt.compare(clave, user.clave)){
            const token = jwt.sign({id: user.id, usuario: user.usuario}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.json({token});
        } else {
            resizeTo.status(401).json({message: 'credenciales erroneas'});
        }
    } catch (err) {
        res.status(500).json({message: 'Error Interno Del Servidor'});
    }
});

module.exports = router;