const { Router } = require('express');
const router = Router();

// router.get('/employees', (req,res) => {
//     res.send('employees');
// });

const { getEmp, getSales, getExp, getPayments, createEmp, deleteEmp} = require('../controllers/index.controller');

router.get('/api/employees', getEmp);
router.get('/api/sales', getSales);
router.get('/api/exp', getExp);
router.get('/api/payments', getPayments);
router.post('/api/employees', createEmp);
router.delete('/api/employees/:id', deleteEmp);

module.exports = router;