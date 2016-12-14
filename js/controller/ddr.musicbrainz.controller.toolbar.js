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
                restangular.one('artist').get({'query': 'artist:' + searchText})
                    .then(function (response) {
                        deferred.resolve(response.artists);
                    })
                    .catch(function (response) {
                        deferred.reject(response);
                    });
            }, 500);

            return deferred.promise;
        };

        $scope.$watch('selectedItem', function (selectedItem) {
            console.log('Selected', selectedItem);
        });
    }
})();
