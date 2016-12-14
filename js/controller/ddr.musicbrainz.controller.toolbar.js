(function () {
    'use strict';

    angular.module('ddr.musicbrainz.controllers').controller('ddr.musicbrainz.controller.toolbar', Controller);

    Controller.$inject = ['$scope', 'Restangular', '$q', '$timeout'];

    function Controller($scope, restangular, $q, $timeout) {

        var searchTimeout;
        $scope.search = function (searchText) {
            var deferred = $q.defer();
            $timeout.cancel(searchTimeout);
            searchTimeout = $timeout(function () {
                var artistsPromise = restangular.one('artist').get({'query': 'artist:' + searchText, 'limit': 10});
                var releaseGroupsPromise = restangular.one('release-group').get({'query': 'releasegroup:' + searchText, 'limit': 10});
                var recordingsPromise = restangular.one('recording').get({'query': 'recording:' + searchText, 'limit': 10});
                $q.all([artistsPromise, releaseGroupsPromise, recordingsPromise])
                    .then(function (data) {
                        var artistResult = data[0];
                        var releaseGroupResult = data[1];
                        var recordingResult = data[2];
                        var results = [];

                        var i;
                        for (i = 0; i < artistResult.artists.length; i++) {
                            var artist = artistResult.artists[i];
                            results.push({
                                'id': artist.id,
                                'name': artist.name,
                                'type': 'artist'
                            });
                        }

                        for (i = 0; i < releaseGroupResult['release-groups'].length; i++) {
                            var releaseGroup = releaseGroupResult['release-groups'][i];
                            results.push({
                                'id': releaseGroup.id,
                                'name': releaseGroup.title,
                                'artistCredit': releaseGroup['artist-credit'],
                                'type': 'release-group'
                            });
                        }

                        for (i = 0; i < recordingResult.recordings.length; i++) {
                            var recording = recordingResult.recordings[i];
                            results.push({
                                'id': recording.id,
                                'name': recording.title,
                                'artistCredit': recording['artist-credit'],
                                'type': 'recording'
                            });
                        }

                        console.log(results);

                        deferred.resolve(results);
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    })
            }, 500);

            return deferred.promise;
        };

        $scope.$watch('selectedItem', function (selectedItem) {
            console.log('Selected', selectedItem);
        });
    }
})();
