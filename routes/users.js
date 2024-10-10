// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ajusta según tu estructura de carpetas

// Ejemplo de ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Aquí obtienes todos los usuarios de tu base de datos
        res.json(users);
    } catch (error) {
        res.status(500).send('Error al obtener usuarios: ' + error.message);
    }
});

module.exports = router;
