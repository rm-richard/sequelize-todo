'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.delete('/:id', controller.delete);

router.post('/:id/tasks', controller.createTask);
router.put('/:userid/tasks/:taskid', controller.setDone);
router.delete('/:userid/tasks/:taskid', controller.deleteTask);

module.exports = router;
