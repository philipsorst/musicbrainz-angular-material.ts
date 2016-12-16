(function () {
    'use strict';

    angular.module('ddr.musicbrainz.controllers').controller('ddr.musicbrainz.controller.release', Controller);

    Controller.$inject = ['$scope', 'Restangular', 'ddr.musicbrainz.service.artist', '$routeParams'];

    function Controller($scope, restangular, artistService, $routeParams) {
        restangular.one('release', $routeParams.id).get({'inc': 'recordings+artist-credits'})
            .then(function (response) {
                $scope.release = response;
                $scope.setTitle(artistService.stringifyArtistCredit(response['artist-credit']) + ' - ' + $scope.release.title);
            })
            .finally(function () {

            });
    }
})();
