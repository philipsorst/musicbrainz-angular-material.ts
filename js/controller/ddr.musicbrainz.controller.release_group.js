(function () {
    'use strict';

    angular.module('ddr.musicbrainz.controllers').controller('ddr.musicbrainz.controller.release_group', Controller);

    Controller.$inject = ['$scope', 'Restangular', '$q', '$timeout', '$location', '$routeParams'];

    function Controller($scope, restangular, $q, $timeout, $location, $routeParams) {
        restangular.one('release-group', $routeParams.id).get({'inc': 'releases+artist-credits'})
            .then(function (response) {
                $scope.releases = response.releases;
                $scope.setTitle(response.title);
            })
    }
})();
