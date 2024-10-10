const express = require('express');
const paypal = require('paypal-rest-sdk');

const router = express.Router();

// Configurar PayPal
paypal.configure({
    mode: 'sandbox', // 'sandbox' o 'live'
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
});

// Cursos disponibles
let cursos = [
    { id: 1, nombre: "Trading de Futuros - Principiante", precio: 200 },
    { id: 2, nombre: "Trading Avanzado - Estrategias Complejas", precio: 800 }
];

// Endpoint para obtener cursos
router.get('/', (req, res) => {
    res.json(cursos);
});

// Endpoint para iniciar un pago con PayPal
router.post('/pay', (req, res) => {
    const { amount } = req.body;
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
            return_url: 'http://localhost:3002/success',
            cancel_url: 'http://localhost:3002/cancel'
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

module.exports = router;
