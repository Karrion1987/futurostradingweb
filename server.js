const express = require('express');
const cors = require('cors');
const paypal = require('paypal-rest-sdk');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { exec } = require('child_process');
const usersRouter = require('./routes/users'); // Asegúrate de que este archivo existe

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
require('dotenv').config();
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB', err));

// Configurar PayPal
paypal.configure({
    mode: 'sandbox', // 'sandbox' o 'live'
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
});

// Usar el router de usuarios
app.use('/api/users', usersRouter); // Esta línea activa el router
// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas
const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

app.listen(PORT, () => {console.log(`Servidor corriendo en http://localhost:${port}`);
});