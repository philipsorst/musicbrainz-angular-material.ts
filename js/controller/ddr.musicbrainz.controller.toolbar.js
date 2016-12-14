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
                var artistsPromise = restangular.one('artist').get({
                    'query': searchText,
                    'limit': 10
                });
                var releaseGroupsPromise = restangular.one('release-group').get({
                    'query': buildRecordingQuery(searchText),
                    'limit': 10
                });
                var recordingsPromise = restangular.one('recording').get({
                    'query': searchText,
                    'limit': 10
                });
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
                                'score': artist.score,
                                'type': 'artist'
                            });
                        }

                        for (i = 0; i < releaseGroupResult['release-groups'].length; i++) {
                            var releaseGroup = releaseGroupResult['release-groups'][i];
                            results.push({
                                'id': releaseGroup.id,
                                'name': releaseGroup.title,
                                'artistCredit': releaseGroup['artist-credit'],
                                'score': releaseGroup.score,
                                'type': 'release-group'
                            });
                        }

                        for (i = 0; i < recordingResult.recordings.length; i++) {
                            var recording = recordingResult.recordings[i];
                            results.push({
                                'id': recording.id,
                                'name': recording.title,
                                'artistCredit': recording['artist-credit'],
                                'score': recording.score,
                                'type': 'recording'
                            });
                        }

                        results = results.sort(function (left, right) {
                            return right.score - left.score;
                        });

                        deferred.resolve(results);
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    })
            }, 500);

            return deferred.promise;
        };

        function buildRecordingQuery(searchText) {
            var words = searchText.split(' ');
            var joinedWords = words.join(' OR ');
            var query =  joinWords(words, 'artist:') + ' OR ' + joinWords(words, 'recording:');
            console.log(query);

            return query;
        }

        function joinWords(words, prefix) {
            var result = '';
            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                result += prefix + word;
                if (i < words.length - 1) {
                    result += ' OR ';
                }
            }

            return result;
        }

        $scope.$watch('selectedItem', function (selectedItem) {
            console.log('Selected', selectedItem);
        });
    }
})();
