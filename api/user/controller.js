'use strict';

var models = require('../../models');
var logger = require('morgan');

//List users, return json with 'id', 'username', 'Tasks'
exports.list = function(req, res) {
  models.User.findAll({
    include: [models.Task],
    attributes: ['id', 'username']
  }).then(function(users) {
    res.json(users);
  });
}

//create user with parameter 'username'
exports.create = function(req, res) {
  models.User.create({
    username: req.body.username
  }).then(function(err) {
    res.redirect('/');
  });
}

//delete user by id
exports.delete = function(req, res) {
  models.User.find(req.params.id).then(function(user) {
    user.destroy().then(function() {
      res.status(200).end();
    });
  });
}

//create task for user
exports.createTask = function(req, res) {
  models.User.find(req.params.id).then(function(user) {
    models.Task.create({title: req.body.title}).then(function(task) {
      user.addTask(task).then(function() {
        res.redirect('/');
      });
    });
  });
}

//set task as done or not done
exports.setDone = function(req, res) {
  models.User.find(req.params.userid).then(function(user) {
    user.getTasks({where: 'id='+req.params.taskid}).then(function(tasks) {
      tasks[0].updateAttributes({
        isDone: req.body.isDone
      }).then(function() {
        res.status(200).end();
      });
    });
  });
}

//delete task
exports.deleteTask = function(req, res) {
  models.User.find(req.params.userid).then(function(user) {
    user.getTasks({where: 'id='+req.params.taskid}).then(function(tasks) {
      tasks[0].destroy().then(function() {
        res.status(200).end();
      });
    });
  });
}
