const express = require('express');
const { createPayment } = require('../controllers/preferenceController');
// const { createPreference } = require('../services/mercadoPagoServices');
const router = express.Router();

router.post('/create-payment', createPayment);

module.exports = router;
