const express = require('express');
const app = express();
const port = 3000;

const authRoutes = require('./userRoutes');
const database = require('./dataRoutes');
const authMiddleware = require('./authMiddleware');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/data', authMiddleware, dataRoutes);

app.listen(port, () => {
    console.log('Server escuchado en http://localhost:${port}');
});