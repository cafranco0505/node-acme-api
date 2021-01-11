const { Router } = require('express');
const router = Router();

// router.get('/employees', (req,res) => {
//     res.send('employees');
// });

const { getEmp, getEmpById, createEmp, deleteEmp, getSales,createSale, getSalesSUM, getEmpSalesSUM} = require('../controllers/index.controller');

// peticiones empleados
router.get('/api/employees', getEmp);
router.get('/api/employees/:id', getEmpById);
router.post('/api/employees', createEmp);
router.delete('/api/employees/:id', deleteEmp);
// peticiones ventas
router.get('/api/sales', getSales);
router.post('/api/sales', createSale);
router.get('/api/sales', getSalesSUM);
router.get('/api/sales/:id', getEmpSalesSUM);
// peticiones pagos


module.exports = router;