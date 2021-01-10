const { Router } = require('express');
const router = Router();

// router.get('/employees', (req,res) => {
//     res.send('employees');
// });

const { getEmp, getUserById, createUser, updateUser, deleteUser } = require('../controllers/index.controller');

router.get('/api/employees', getEmp);

module.exports = router;