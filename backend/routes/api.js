const express = require('express');
const rateLimit = require('express-rate-limit');

const apilimiter = rateLimit({
    windowMs: 1000 * 60 * 3, // 15 minutes
    max: 100,
    message: "You have exceeded the 100 requests in 3 minutes limit!",
});

const router = express.Router();

const taskController = require('../controllers/taskstable');

router.post('/tasks', apilimiter, taskController.createTask);
router.get('/tasks', apilimiter, taskController.getTasks);
router.get('/tasks/:id', apilimiter, taskController.getTask);
router.put('/tasks/:id', apilimiter, taskController.updateTask);
router.delete('/tasks/:id', apilimiter, taskController.deleteTask);

module.exports = router;