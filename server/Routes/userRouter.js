const express = require('express');
const router = express.Router();

const {registerUser, loginUser, verifyToken, updateUser, userCurrent, getAllUsers, getUserById, verifyAuthToken} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', verifyToken, userCurrent);
router.put('/update/:id', updateUser);
router.get('/all', getAllUsers);
router.get('/getuser/:id', getUserById);
router.get('/:id/confirmation/:token', verifyAuthToken);


module.exports = router;