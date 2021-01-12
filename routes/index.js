const { Router } = require('express');
const router = Router();

// router.get('/employees', (req,res) => {
//     res.send('employees');
// });

const { getEmp, getEmpById, createEmp, deleteEmp, editEmp, getSales,createSale, getSalesSUM, getEmpSalesSUM , createPay, getPayments, getPaymentsById} = require('../controllers/index.controller');

// peticiones empleados
router.get('/api/employees', getEmp);
router.get('/api/employees/:id', getEmpById);
router.post('/api/employees', createEmp);
router.delete('/api/employees/:id', deleteEmp);
router.put('/api/employees', editEmp);
// peticiones ventas
router.get('/api/sales', getSales);
router.post('/api/sales', createSale);
router.get('/api/sales/total', getSalesSUM);
router.get('/api/sales/:id', getEmpSalesSUM);
// peticiones pagos
router.post('/api/pay', createPay);
router.get('/api/pay', getPayments);
router.get('/api/pay/:id', getPaymentsById);


module.exports = router;