const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) =>{
    const authHeader = req.authheaders['autorizacion'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(402).json({message: 'token no proporcionado'});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: 'token invalido'});
        req.user = user;
        next();
    });

};