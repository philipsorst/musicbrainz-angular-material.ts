(function () {
    'use strict';

    angular.module('ddr.musicbrainz.controllers').controller('ddr.musicbrainz.controller.release_group', Controller);

    Controller.$inject = ['$scope', 'Restangular', 'ddr.musicbrainz.service.artist', '$timeout', '$location', '$routeParams'];

    function Controller($scope, restangular, artistService, $timeout, $location, $routeParams) {
        $scope.loading = true;
        restangular.one('release-group', $routeParams.id).get({'inc': 'releases+artist-credits'})
            .then(function (response) {
                $scope.releaseGroup = response;
                $scope.setTitle(artistService.stringifyArtistCredit(response['artist-credit']) + ' - ' + response.title);
            })
            .finally(function () {
                $scope.loading = false;
            });
    }
})();
