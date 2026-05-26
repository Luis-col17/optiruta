// config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host:             'localhost',
    user:             'root',
    password:         '',
    database:         'optiruta',
    port:             3306,
    waitForConnections: true,
    connectionLimit:  10
});

// Verificar conexión al iniciar
pool.getConnection()
    .then(conn => {
        console.log('✅ Conectado a MySQL — base de datos: optiruta');
        conn.release();
    })
    .catch(err => {
        console.error('❌ Error conectando a MySQL:', err.message);
    });

module.exports = pool;