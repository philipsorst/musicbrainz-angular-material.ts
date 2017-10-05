import {Component} from "@angular/core";
import {PaginatedArray} from "../module/paginated-array";
import {Artist} from "../model/artist";
import {MusicbrainzEntity} from "../model/musicbrainz-entity";
import {MusicbrainzService} from "../service/musicbrainz.service";
import {ReleaseGroup} from "../model/release-group";
import {Release} from "../model/release";
import {Recording} from "../model/recording";

@Component({
    templateUrl: './search.component.html',
})
export class SearchComponent {

    searchString = {
        artists: null,
        releaseGroups: null,
        releases: null,
        recordings: null
    };

    loading = {
        artists: false,
        releaseGroups: false,
        releases: false,
        recordings: false
    };

    result = {
        artists: null,
        releaseGroups: null,
        releases: null,
        recordings: null
    };

    constructor(private musicbrainzService: MusicbrainzService) {
    }

    public searchArtists() {
        this.loading.artists = true;
        this.result.artists = null;
        this.musicbrainzService.searchArtists(this.searchString.artists)
            .then((artists: PaginatedArray<Artist>) => {
                this.result.artists = artists;
                this.loading.artists = false;
            })
            .catch(reason => {
                console.error(reason);
                this.loading.artists = false;
            });
    }

    public searchReleaseGroups() {
        this.loading.releaseGroups = true;
        this.result.releaseGroups = null;
        this.musicbrainzService.searchReleaseGroups(this.searchString.releaseGroups)
            .then((releaseGroups: PaginatedArray<ReleaseGroup>) => {
                this.result.releaseGroups = releaseGroups;
                this.loading.releaseGroups = false;
            })
            .catch(reason => {
                console.error(reason);
                this.loading.releaseGroups = false;
            });
    }

    public searchReleases() {
        this.loading.releases = true;
        this.result.releases = null;
        this.musicbrainzService.searchReleases(this.searchString.releases)
            .then((releases: PaginatedArray<Release>) => {
                this.result.releases = releases;
                this.loading.releases = false;
            })
            .catch(reason => {
                console.error(reason);
                this.loading.releases = false;
            });
    }

    public searchRecordings() {
        this.loading.recordings = true;
        this.result.recordings = null;
        this.musicbrainzService.searchRecordings(this.searchString.recordings)
            .then((recordings: PaginatedArray<Recording>) => {
                this.result.recordings = recordings;
                this.loading.recordings = false;
            })
            .catch(reason => {
                console.error(reason);
                this.loading.recordings = false;
            });
    }

    public trackById(index: number, musicbrainzEntity: MusicbrainzEntity): string {
        return musicbrainzEntity.id;
    }
}
