const { Pool } = require('pg');

const pool = new Pool({
    user: 'acmin',
    host: 'employees.cdlzpbazeqha.us-east-2.rds.amazonaws.com',
    password: 'Acme1305',
    database: 'empleados_acme',
    port: '5432'
});

const getEmp = async (req, res) => {
    const response = await pool.query('SELECT * FROM asesores ORDER BY nombre ASC');
    res.status(200).json(response.rows);
};



module.exports = {
    getEmp
};