(function () {
    'use strict';

    angular.module('ddr.musicbrainz.services').factory('ddr.musicbrainz.service.artist', Service);

    Service.$inject = [];

    function Service() {

        function stringifyArtistCredit(credits) {
            if (angular.isUndefined(credits)) {
                return '';
            }

            var result = '';
            for (var i = 0; i < credits.length; i++) {
                var credit = credits[i];
                result += credit.artist.name;
                if (angular.isDefined(credit.joinphrase)) {
                    result += credit.joinphrase;
                }
            }

            return result;
        }

        function stringifyLifeSpan(artist) {
            if (angular.isUndefined(artist)) {
                return '';
            }

            var begin = artist['life-span'].begin;
            var end = artist['life-span'].end;
            var ended = artist['life-span'].ended;

            if (!begin && !end) {
                return '';
            }

            var ret = '';

            if (begin) {
                ret += begin;
            }
            ret += ' - ';
            if (end) {
                ret += end;
            }

            return ret;
        }

        return {
            'stringifyLifeSpan': stringifyLifeSpan,
            'stringifyArtistCredit': stringifyArtistCredit
        };
    }
})();
