const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/courses');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/cursos', coursesRoutes);

// Puerto
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
