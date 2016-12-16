(function () {
    'use strict';

    angular.module('ddr.musicbrainz.filters').filter('ddrMbArtistCredit', Filter);

    Filter.$inject = ['ddr.musicbrainz.service.artist'];

    function Filter(artistService) {
        return function (input) {
            return artistService.stringifyArtistCredit(input);
        }
    }
})();
