const express = require('express');

const router = express.Router();

const {
    calcularRutas
} = require('../controllers/rutas.controller');

// ==========================================
// RUTAS
// ==========================================

router.get(
    '/optimizar',
    calcularRutas
);

module.exports = router;