<!DOCTYPE html>
<html lang="en" ng-app="ddr.musicbrainz.app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <?php
    function url(){
        return sprintf(
            "%s://%s%s",
            isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
            $_SERVER['SERVER_NAME'],
            $_SERVER['BASE']
        );
    }
    ?>
    <base href="<?php echo url().'/' ?>" />
    <title ng-bind="title">Musicbrainz Browser</title>
    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:400,700'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="lib/angular-material/angular-material.min.css" />
    <link rel="stylesheet" href="css/style.css" />
</head>

<body ng-cloak layout="row">

<md-sidenav class="md-sidenav-left" md-component-id="left" md-whiteframe="4" layout="column">

    <md-toolbar>
        <h1 class="md-toolbar-tools">Sidenav Left</h1>
    </md-toolbar>
    <md-content>
        <md-list>
            <md-list-item ng-click="setLocation('/')">
                Search
            </md-list-item>
        </md-list>
    </md-content>

</md-sidenav>

<div layout="column" flex>

    <div ng-controller="ddr.musicbrainz.controller.toolbar">
        <md-toolbar ng-show="!showSearch">
            <div class="md-toolbar-tools">
                <md-button ng-click="toggleSidenav('left')" class="md-icon-button" aria-label="Menu">
                    <md-icon>menu</md-icon>
                </md-button>
                <h1 ng-bind="title">Musicbrainz Browser</h1>
                <span flex></span>
                <md-button aria-label="Search" ng-click="showSearch = !showSearch" class="md-icon-button">
                    <md-icon>search</md-icon>
                </md-button>
            </div>
        </md-toolbar>

        <md-toolbar ng-show="showSearch">
            <div class="md-toolbar-tools">
                <md-button ng-click="showSearch = !showSearch" aria-label="Back" class="md-icon-button">
                    <md-icon>arrow_back</md-icon>
                </md-button>
                <md-autocomplete
                        flex
                        placeholder="Search"
                        md-selected-item="selectedItem"
                        md-search-text="searchText"
                        md-items="item in search(searchText)"
                        md-item-text="item.name"
                >
                    <md-item-template>
                        <md-icon ng-show="item.type=='artist'">group</md-icon>
                        <md-icon ng-show="item.type=='release-group'">album</md-icon>
                        <md-icon ng-show="item.type=='recording'">audiotrack</md-icon>
                        <span ng-show="item.type == 'release-group' || item.type == 'recording'">
                            {{item.artistCredit|ddrMbArtistCredit}} -
                        </span>
                        <span md-highlight-text="searchText" md-highlight-flags="^i">
                            {{item.name}}
                        </span>
                        <span>
                            - {{item.score}}
                        </span>
                    </md-item-template>
                </md-autocomplete>
            </div>

        </md-toolbar>
    </div>

    <md-content ng-view>
    </md-content>

</div>

<script type="text/javascript" src="lib/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="lib/angular/angular.js"></script>
<script type="text/javascript" src="lib/angular-route/angular-route.js"></script>
<script type="text/javascript" src="lib/angular-animate/angular-animate.js"></script>
<script type="text/javascript" src="lib/angular-aria/angular-aria.js"></script>
<script type="text/javascript" src="lib/angular-material/angular-material.js"></script>
<script type="text/javascript" src="lib/lodash/lodash.js"></script>
<script type="text/javascript" src="lib/restangular/dist/restangular.js"></script>

<script type="text/javascript" src="js/app.js"></script>

<script type="text/javascript" src="js/controller/ddr.musicbrainz.controller.toolbar.js"></script>
<script type="text/javascript" src="js/controller/ddr.musicbrainz.controller.index.js"></script>
<script type="text/javascript" src="js/controller/ddr.musicbrainz.controller.artist.js"></script>
<script type="text/javascript" src="js/controller/ddr.musicbrainz.controller.release_group.js"></script>
<script type="text/javascript" src="js/controller/ddr.musicbrainz.controller.release.js"></script>
<script type="text/javascript" src="js/controller/ddr.musicbrainz.controller.recording.js"></script>
<script type="text/javascript" src="js/controller/ddr.musicbrainz.controller.test.js"></script>

<script type="text/javascript" src="js/service/ddr.musicbrainz.service.artist.js"></script>

<script type="text/javascript" src="js/filter/ddr.musicbrainz.filter.artist-credit.js"></script>
<script type="text/javascript" src="js/filter/ddr.musicbrainz.filter.duration.js"></script>
<script type="text/javascript" src="js/filter/ddr.musicbrainz.filter.artist-life-span.js"></script>
</body>
</html>
