var nameApp = angular.module('nameApp', ['ngRoute']);

nameApp.config(function ($routeProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'template/list.html',
            controller: 'StudentListCtrl'
        }).
        when('/:studentId', {
            templateUrl: 'template/details.html',
            controller: 'StudentDetailsCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
});

nameApp.factory('students', function ($http) {

    var loadData = function (callback) {

        var options = {
            method: 'GET',
            url: 'student.json',
            cache: true
        };

        $http(options).success(function (data) {

            callback(data);
        });
    };

    return {
        list: loadData,
        find: function (studentId, callback) {

            var id = parseInt(studentId);
            loadData(function (data) {

                var student = data.filter(function (entry) {

                    return entry.id === id;
                })[0];

                callback(student);
            });
        }
    };
});

nameApp.directive('address', function() {

    return {
        scope: {
            address: '='
        },
        restrict: 'A',
        templateUrl: 'template/address.html',
        controller: function ($scope) {

            return;
        }
    };
});

nameApp.controller('StudentListCtrl',function ($scope, students) {

    students.list(function (data) {

        $scope.students = data;
    });
});

nameApp.controller('StudentDetailsCtrl', function ($scope, $routeParams, students) {

    students.find($routeParams.studentId, function (student) {

        $scope.student = student;
    });
});
