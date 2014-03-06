'use strict';

angular.module('chatWebApp')
    .controller('ChatCtrl', function ($scope, socket) {
        $scope.messages = [];
        $scope.newMessage = '';
        $scope.username = false;
        $scope.inputUsername = '';
        $scope.glued = true;

        socket.forward('message', $scope);
        $scope.$on('socket:message', function (ev, data) {
            if ($scope.messages.length > 100) {
                $scope.messages.splice(0, 1);
            }
            $scope.messages.push(data);
        });

        $scope.sendMessage = function () {
            socket.emit('send_message', {
                message: $scope.newMessage,
                username: $scope.username
            });
            $scope.newMessage = '';
        };

        $scope.setUsername = function () {
            $scope.username = $scope.inputUsername;
            socket.emit('joined_message', {
                'username': $scope.username
            });
        };
    });
