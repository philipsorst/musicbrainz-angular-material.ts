(function () {
    'use strict';

    angular.module('ddr.musicbrainz.controllers').controller('ddr.musicbrainz.controller.release', Controller);

    Controller.$inject = ['$scope', 'Restangular', '$q', '$timeout', '$location', '$routeParams'];

    function Controller($scope, restangular, $q, $timeout, $location, $routeParams) {
        restangular.one('release', $routeParams.id).get({'inc': 'recordings+artist-credits'})
            .then(function (response) {
                $scope.release = response;
                $scope.setTitle($scope.release.title);
            })
            .finally(function () {

            });
    }
})();
