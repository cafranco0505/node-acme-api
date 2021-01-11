const { Pool } = require('pg');

const pool = new Pool({
    user: 'acmin',
    host: 'employees.cdlzpbazeqha.us-east-2.rds.amazonaws.com',
    password: 'Acme1305',
    database: 'empleados_acme',
    port: '5432'
});
// get all employees and exp lvel
const getEmp = async (req, res) => {
    const response = await pool.query('SELECT * FROM asesores INNER JOIN niveles ON asesores.nivel = niveles.id_nivel ORDER BY id_asesor ASC');
    res.status(200).json(response.rows);
};

// get employee by id
const getEmpById = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('SELECT * FROM asesores where id_asesor = $1', [id]);
    res.json(`Empleado ${id} borrado`);
};

// create employee
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

// delete employee by id
const deleteEmp = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM asesores where id_asesor = $1', [id]);
    res.json(`Empleado ${id} borrado`);
};

// edit employee by id
const editEmp = async (req, res) => {
    try {
        // peticion asincrona
        const { nombre, apellido1, apellido2, direccion, telefono, email, nivel, id } = req.body;
        const response = await pool.query('UPDATE asesores SET nombre = $1, apellido1 = $2, apellido2 = $3, direccion = $4, telefono = $5 , email = $6 , nivel = $7 WHERE id_asesor = $8', [nombre, apellido1, apellido2, direccion, telefono, email, nivel ,id]);
        res.json({
            message: 'Employee Created',
            body: {
                user: { nombre, apellido1, apellido2, direccion, telefono, email, nivel, id }
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

// get all sales
const getSales = async (req, res) => {
    const response = await pool.query('SELECT * FROM ventas');
    res.status(200).json(response.rows);
};

// create Sale
const createSale = async (req, res) => {
    try {
        // peticion asincrona
        const { valor, asesor} = req.body;
        const response = await pool.query('INSERT INTO ventas(valor, asesor, fecha_factura) values($1, $2, CURRENT_TIMESTAMP)', [valor, asesor]);
        res.json({
            message: 'Sale Created',
            body: {
                user: { valor, asesor }
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

// get sales SUM
const getSalesSUM = async (req, res) => {
    const response = await pool.query('SELECT SUM(valor) FROM ventas');
    res.status(200).json(response.rows);
};

// get employees sales SUM
const getEmpSalesSUM = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('SELECT SUM(valor), asesor FROM ventas GROUP BY asesor HAVING asesor = $1', [id]);
    res.json(`Empleado ${id} borrado`);
};

// create pay
const createPay = async (req, res) => {
    try {
        // peticion asincrona
        const {comision, total, asesor} = req.body;
        const response = await pool.query('INSERT INTO ventas(comision, total, asesor, fecha_pago) values($1, $2, $3, CURRENT_TIMESTAMP)', [comision, total, asesor]);
        res.json({
            message: 'Check',
            body: {
                user: {comision, total, asesor }
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};


// get all payments
const getPayments = async (req, res) => {
    const response = await pool.query('SELECT * FROM pagos');
    res.status(200).json(response.rows);
};

// get payments by Employee
const getPaymentsById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM pagos where id_asesor = $1', [id]);
};






module.exports = {
    getEmp,
    getEmpById,
    createEmp,
    deleteEmp,
    editEmp,
    getSales,
    createSale,
    getSalesSUM,
    getEmpSalesSUM,
    createPay,
    getPayments,
    getPaymentsById
};