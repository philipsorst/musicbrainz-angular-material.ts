(function () {
    'use strict';

    angular.module('ddr.musicbrainz.directives').directive('ddrMbArtistCredit', Directive);

    Directive.$inject = [];

    function Directive() {
        return {
            restrict: 'A',
            scope: {
                artistCredits: '=ddrMbArtistCredit'
            },
            link: function (scope, elm, attrs) {
                console.log(scope);
            },
            template: '<span ng-repeat="artistCredit in artistCredits"><a href="artist/{{artistCredit.artist.id}}" class="artist-credit">{{artistCredit.artist.name}}</a>{{artistCredit.joinPhrase}}</span>'
        }
    }
})();
