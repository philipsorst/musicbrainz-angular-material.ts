(function () {
    'use strict';

    angular.module('ddr.musicbrainz.filters').filter('ddrMbArtistCredit', Filter);

    Filter.$inject = [];

    function Filter() {
        return function (input) {
            if (angular.isUndefined(input)) {
                return '';
            }

            var result = '';
            for (var i = 0; i < input.length; i++) {
                var credit = input[i];
                result += credit.artist.name;
                if (angular.isDefined(credit.joinphrase)) {
                    result += credit.joinphrase;
                }
            }

            return result;
        }
    }
})();
