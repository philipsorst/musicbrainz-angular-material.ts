(function () {
    'use strict';

    angular.module('ddr.musicbrainz.app', ['ngMaterial', 'restangular'])
        .config(configBlock);

    configBlock.$inject = ['$httpProvider', '$mdThemingProvider', 'RestangularProvider', '$locationProvider'];
    function configBlock( $httpProvider, $mdThemingProvider, RestangularProvider, $locationProvider) {

        /* DELETE has content-type xml set by default */
        $httpProvider.defaults.headers["delete"] = {
            'Content-Type': 'application/json;charset=utf-8'
        };

        // RestangularProvider.setBaseUrl(fetchtool.config.apiPath);
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

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');

        // $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        // $httpProvider.interceptors.push('ddr.fetchtool.http.error_interceptor');
    }

    runBlock.$inject = ['$rootScope', '$mdSidenav', '$document', '$window', '$location', '$timeout', 'Restangular',  '$mdToast'];
    function runBlock($rootScope, $mdSidenav, $document, $window, $location, $timeout, Restangular,  $mdToast) {

        $rootScope.toggleSidenav = function(menuId) {
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
        $window.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };

        $rootScope.back = function () {
            $window.history.back();
        };

               $($document).keyup(function (e) {
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

        if (InitService.applyCookie()) {
            InitService.load().then(function (user) {
                InitService.removeLoadingScreen();
            });
        }
    }
})();
