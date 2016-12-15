(function () {
    'use strict';

    angular.module('ddr.musicbrainz.filters').filter('ddrMbDuration', Filter);

    Filter.$inject = [];

    function Filter() {
        return function (input) {
            if (angular.isUndefined(input)) {
                return '';
            }

            var seconds = input / 1000;
            var minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;

            var secondsFormat = seconds.toFixed();
            if (secondsFormat.length < 2) {
                secondsFormat = "0" + secondsFormat;
            }

            return minutes + ":" + secondsFormat;
        }
    }
})();
