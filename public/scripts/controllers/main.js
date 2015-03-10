'use strict';

angular.module('mainApp')
  .controller('MainCtrl', function($scope, $http) {
    $scope.users = [];
    $scope.username = '';

    $scope.getUsers = function() {
      $http.get('/api/users').success(function(data) {
        $scope.users = data;
      });
    };

    $scope.getUsers();

    $scope.createUser = function() {
      $http.post('/api/users', {'username': $scope.username})
      .success(function() {
        $scope.username = '';
        $scope.getUsers();
      });
    };

    $scope.deleteUser = function(user) {
      $http.delete('/api/users/' + user.id)
      .success(function() {
        $scope.getUsers();
      });
    };

    $scope.createTask = function(user) {
      $http.post('/api/users/' + user.id + '/tasks', {'title': user.title})
      .success(function() {
        $scope.getUsers();
      });
    };

    $scope.solveTask = function(user, task) {
      $http.put('/api/users/' + user.id + '/tasks/' + task.id, {'isDone': true})
      .success(function() {
        $scope.getUsers();
      });
    };

    $scope.deleteTask = function(user, task) {
      $http.delete('/api/users/' + user.id + '/tasks/' + task.id)
      .success(function() {
        $scope.getUsers();
      });
    };
  });
