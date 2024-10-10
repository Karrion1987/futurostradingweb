const express = require('express');
const cors = require('cors');
const paypal = require('paypal-rest-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// Configurar PayPal
paypal.configure({
    mode: 'sandbox', // 'sandbox' o 'live'
    client_id: 'AUChW_bQtsaoSyWBa9iF0SLpLfkiHuiPoK9S3ps0QufBVzqC2hUBCuCuXBk44iee2beIduBBgmOhJd4x',
    client_secret: 'EL1PHPGZSTQF-vI36TVUo9g1ZckuepXgq53wtWHDXhuKDPrGqU4-qxOnhIpVkmuxs9BZQzu7wJ-JVlsn'
});

// Cursos disponibles
let cursos = [
    { id: 1, nombre: "Trading de Futuros - Principiante", precio: 200 },
    { id: 2, nombre: "Trading Avanzado - Estrategias Complejas", precio: 800 }
];

// Endpoint para obtener cursos
app.get('/api/cursos', (req, res) => {
    res.json(cursos);
});

// Endpoint para iniciar un pago con PayPal
app.post('/api/pay', (req, res) => {
    const { amount } = req.body; // Asegúrate de que amount esté en el cuerpo de la solicitud
    const paymentJson = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        transactions: [{
            amount: {
                total: amount,
                currency: 'USD'
            },
            description: 'Compra de curso de trading'
        }],
        redirect_urls: {
            return_url: 'http://localhost:3001/success',
            cancel_url: 'http://localhost:3001/cancel'
        }
    };

    paypal.payment.create(paymentJson, (error, payment) => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
        } else {
            res.json(payment);
        }
    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
