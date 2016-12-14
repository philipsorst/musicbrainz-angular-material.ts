(function () {
    'use strict';

    angular.module('ddr.musicbrainz.app', [
        'ddr.musicbrainz.controllers',
        'ddr.musicbrainz.filters',
        'ngMaterial',
        'restangular',
        'ngRoute'
    ])
        .config(configBlock)
        .run(runBlock);

    configBlock.$inject = ['$httpProvider', '$mdThemingProvider', 'RestangularProvider', '$locationProvider', '$routeProvider'];
    function configBlock($httpProvider, $mdThemingProvider, RestangularProvider, $locationProvider, $routeProvider) {

        /* DELETE has content-type xml set by default */
        $httpProvider.defaults.headers["delete"] = {
            'Content-Type': 'application/json;charset=utf-8'
        };

        $routeProvider.when('/', {
            templateUrl: 'partials/index.html',
            controller: 'ddr.musicbrainz.controller.index'
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });

        RestangularProvider.setBaseUrl('https://musicbrainz.org/ws/2/');
        RestangularProvider.setDefaultRequestParams({'fmt': 'json'});
        RestangularProvider.setDefaultHttpFields({cache: true});

        // RestangularProvider.setRestangularFields({
        //     selfLink: '_links.self.href'
        // });
        // RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        //     if ('getList' === operation) {
        //         if (null !== response.headers('x-pagination-current-page')) {
        //             data.pagination = {
        //                 currentPage: response.headers('x-pagination-current-page'),
        //                 perPage: response.headers('x-pagination-per-page'),
        //                 total: response.headers('x-pagination-total'),
        //                 totalPages: response.headers('x-pagination-total-pages')
        //             };
        //         }
        //     }
        //     return data;
        // });

        // $mdThemingProvider.theme('default')
        //     .primaryPalette('blue')
        //     .accentPalette('orange');

        // $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        // $httpProvider.interceptors.push('ddr.fetchtool.http.error_interceptor');
    }

    runBlock.$inject = ['$rootScope', '$mdSidenav', '$document', '$window', '$location', '$timeout', 'Restangular', '$mdToast'];
    function runBlock($rootScope, $mdSidenav, $document, $window, $location, $timeout, Restangular, $mdToast) {

        $rootScope.title = 'Musicbrainz Browser';

        $rootScope.toggleSidenav = function (menuId) {
            console.log('toggle', menuId);
            $mdSidenav(menuId).toggle();
        };

        $rootScope.setTitle = function (title) {
            $rootScope.title = title;
        };

        $rootScope.$safeApply = function safeApply(fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        /**
         * Disables the context menu
         * @param event
         * @returns {boolean}
         */
        // $window.oncontextmenu = function (event) {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     return false;
        // };

        $rootScope.back = function () {
            $window.history.back();
        };

        angular.element($document).keyup(function (e) {
            if (e.which == 27) {
                $rootScope.$broadcast("key-escape");
            } else if (e.which == 37) {
                $rootScope.$broadcast('key-left');
            } else if (e.which == 39) {
                $rootScope.$broadcast('key-right');
            } else if (e.which == 40) {
                $rootScope.$broadcast('key-down');
            }
        });
    }

    angular.module('ddr.musicbrainz.controllers', []);
    angular.module('ddr.musicbrainz.filters', []);

})();
