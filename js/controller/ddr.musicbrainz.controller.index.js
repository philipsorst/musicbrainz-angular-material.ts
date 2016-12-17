(function () {
    'use strict';

    angular.module('ddr.musicbrainz.controllers').controller('ddr.musicbrainz.controller.index', Controller);

    Controller.$inject = ['$scope', 'Restangular', '$q', '$timeout', '$location'];

    function Controller($scope, restangular, $q, $timeout, $location) {

        $scope.setTitle('Search Musicbrainz');

        $scope.searchArtist = searchArtist;
        $scope.searchReleaseGroup = searchReleaseGroup;
        $scope.searchRelease = searchRelease;
        $scope.searchRecording = searchRecording;

        $scope.artist = {};
        $scope.releaseGroup = {};
        $scope.release = {};
        $scope.recording = {};

        function searchArtist() {
            console.log('Search artist', $scope.artist);

            var query = '';
            if (!isBlank($scope.artist.name)) {
                query += 'artist:(' + $scope.artist.name + ')';
            }

            if (isBlank(query)) {
                return;
            }

            $scope.searchingArtist = true;
            restangular.one('artist').get({'query': query})
                .then(function (response) {
                    $scope.artists = response.artists;
                })
                .catch(function (response) {
                    console.error(response);
                })
                .finally(function () {
                    $scope.searchingArtist = false;
                });
        }

        function searchReleaseGroup() {
            console.log('Search release-group', $scope.releaseGroup);
        }

        function searchRelease() {
            console.log('Search release', $scope.release);

            var query = '';
            if (!isBlank($scope.release.title)) {
                query += 'release:(' + $scope.release.title + ')';
            }

            if (!isBlank($scope.release.artist)) {
                if (!isBlank(query)) {
                    query += ' AND '
                }
                query += 'artist:(' + $scope.release.artist + ')';
            }

            if (isBlank(query)) {
                return;
            }

            $scope.searchingRelease = true;
            restangular.one('release').get({'query': query})
                .then(function (response) {
                    $scope.releases = response.releases;
                })
                .catch(function (response) {
                    console.error(response);
                })
                .finally(function () {
                    $scope.searchingRelease = false;
                });
        }

        function searchRecording() {
            console.log('Search recording', $scope.recording);
        }

        function isBlank(str) {
            return (!str || /^\s*$/.test(str));
        }
    }
})();
