const express = require('express');
const router = express.Router();
const Controller = require('../controllers/taskController');
const isAuthenticated= require('../middlewares/authMiddleware');


router.post('/', isAuthenticated,Controller.createTask);

router.get('/list',isAuthenticated, Controller.getTasks);

router.put('/:id',isAuthenticated,Controller.updateTask);

router.delete('/:id', isAuthenticated,Controller.deleteTask);
router.patch('/:id/status',isAuthenticated, Controller.changeTaskStatus);


router.patch('/:id/complete', isAuthenticated, Controller.markTaskAsComplete);

module.exports = router;
