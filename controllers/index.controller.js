const { Pool } = require('pg');

const pool = new Pool({
    user: 'acmin',
    host: 'employees.cdlzpbazeqha.us-east-2.rds.amazonaws.com',
    password: 'Acme1305',
    database: 'empleados_acme',
    port: '5432'
});

const getEmp = async (req, res) => {
    const response = await pool.query('SELECT * FROM asesores INNER JOIN niveles ON asesores.nivel = niveles.id_nivel ORDER BY id_asesor ASC');
    res.status(200).json(response.rows);
};

const getSales = async (req, res) => {
    const response = await pool.query('SELECT * FROM ventas');
    res.status(200).json(response.rows);
};

const getExp = async (req, res) => {
    const response = await pool.query('SELECT * FROM niveles');
    res.status(200).json(response.rows);
};

const getPayments = async (req, res) => {
    const response = await pool.query('SELECT * FROM pagos');
    res.status(200).json(response.rows);
};

const createEmp = async (req, res) => {
    try {
        // peticion asincrona
        const { nombre, apellido1, apellido2, direccion, telefono, email, nivel } = req.body;
        const response = await pool.query('INSERT INTO asesores(nombre, apellido1, apellido2, direccion , telefono , email , nivel) values($1, $2, $3, $4, $5, $6, $7)', [nombre, apellido1, apellido2, direccion, telefono, email, nivel]);
        res.json({
            message: 'Employee Created',
            body: {
                user: { nombre, apellido1, apellido2, direccion, telefono, email, nivel }
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};


const deleteEmp = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM asesores where id_asesor = $1', [id]);
    res.json(`Empleado ${id} borrado`);
};
// const getEmp = async (req, res) => {
//     const response = await pool.query('SELECT * FROM asesores INNER JOIN niveles ON asesores.nivel = niveles.id_nivel ORDER BY id_asesor ASC');
//     res.status(200).json(response.rows);
// };

// const getEmp = async (req, res) => {
//     const response = await pool.query('SELECT * FROM asesores INNER JOIN niveles ON asesores.nivel = niveles.id_nivel ORDER BY id_asesor ASC');
//     res.status(200).json(response.rows);
// };



module.exports = {
    getEmp,
    getSales,
    getExp,
    getPayments,
    createEmp,
    deleteEmp
};