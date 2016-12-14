(function () {
    'use strict';

    angular.module('BandExchange.directives').directive('ddrMbArtistCredit', Directive);

    Directive.$inject = ['$rootScope'];

    function Directive($rootScope) {
        return {
            restrict: 'E',
            scope: {
                entity: '=',
                published: '@',
                enabled: '@'
            },
            replace: true,
            link: function (scope, elm, attrs) {
            },
            template: '<button class="btn btn-default btn-icon" ng-disabled="disabled" ng-click="toggle()" title="{{title}}"><span class="fa fa-{{icon}} fa-fw"></span></button>'
        }
    }
})();
