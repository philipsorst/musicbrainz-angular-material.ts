(function () {
    'use strict';

    angular.module('ddr.musicbrainz.services').factory('ddr.musicbrainz.service.artist', Service);

    Service.$inject = [];

    function Service() {

        function stringifyLifeSpan(artist) {
            if (angular.isUndefined(artist)) {
                return '';
            }

            var begin = artist['life-span'].begin;
            var end = artist['life-span'].end;
            var ended = artist['life-span'].ended;

            var ret = '';

            if (begin) {
                ret += begin;
            }
            if (begin && end) {
                ret += ' - ';
            }
            if (end) {
                ret += end;
            }

            return ret;
        }

        return {
            'stringifyLifeSpan': stringifyLifeSpan
        };
    }
})();
