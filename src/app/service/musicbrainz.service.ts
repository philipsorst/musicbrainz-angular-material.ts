import {Injectable} from "@angular/core";
import {Restangular} from "ngx-restangular";
import {ReleaseGroup} from "../model/release-group";
import {Observable} from "rxjs/Observable";
import {PaginatedArray} from "../module/paginated-array";
import {Release} from "../model/release";
import {Artist} from "../model/artist";
import {Recording} from "../model/recording";

@Injectable()
export class MusicbrainzService {

    constructor(private restangular: Restangular) {
    }

    public findArtist(id: string): Promise<Artist> {
        return this.restangular.one('artist', id).get().toPromise();
    }

    public findReleaseGroup(id: string): Promise<ReleaseGroup> {
        return this.restangular.one('release-group', id).get({'inc': 'artists'}).toPromise();
    }

    public findRelease(id: string): Promise<Release> {
        return this.restangular.one('release', id).get({'inc': 'artists+recordings+artist-credits'}).toPromise();
    }

    public listAllReleaseGroups(artistId: string): Promise<Array<ReleaseGroup>> {

        let allReleaseGroups: Array<ReleaseGroup> = [];

        let localRestangular = this.restangular;

        let limit = 100;

        function fetchReleaseGroups(artistId: string, offset: number, limit: number = 100): Observable<PaginatedArray<ReleaseGroup>> {
            return localRestangular.all('release-group').getList({
                'artist': artistId,
                'limit': limit,
                'offset': offset
            });
        }

        function fetchmorepages(paginatedReleaseGroups: PaginatedArray<ReleaseGroup>) {
            allReleaseGroups = allReleaseGroups.concat(paginatedReleaseGroups);
            if (paginatedReleaseGroups.pagination.offset + limit < paginatedReleaseGroups.pagination.count) {
                return fetchReleaseGroups(artistId, paginatedReleaseGroups.pagination.offset + limit, limit).toPromise().then(fetchmorepages);
            }

            return allReleaseGroups;
        }

        return fetchReleaseGroups(artistId, 0, limit).toPromise().then(fetchmorepages)
    }

    public listAllReleases(releaseGroupId: string): Promise<Array<Release>> {
        let localRestangular = this.restangular;
        let allReleases: Array<Release> = [];
        let limit = 100;

        function fetchReleaseGroups(releaseGroupId: string, offset: number, limit: number = 100): Observable<PaginatedArray<Release>> {
            return localRestangular.all('release').getList({
                'release-group': releaseGroupId,
                'limit': limit,
                'offset': offset
            });
        }

        function fetchmorepages(paginatedReleases: PaginatedArray<Release>) {
            allReleases = allReleases.concat(paginatedReleases);
            if (paginatedReleases.pagination.offset + limit < paginatedReleases.pagination.count) {
                return fetchReleaseGroups(releaseGroupId, paginatedReleases.pagination.offset + limit, limit).toPromise().then(fetchmorepages);
            }

            return allReleases;
        }

        return fetchReleaseGroups(releaseGroupId, 0, limit).toPromise().then(fetchmorepages)
    }

    public searchArtists(searchString: string): Promise<PaginatedArray<Artist>> {
        return this.restangular.all('artist').getList({'query': 'artist:(' + searchString + ')'}).toPromise();
    }

    public searchReleaseGroups(searchString: string): Promise<PaginatedArray<ReleaseGroup>> {
        return this.restangular.all('release-group').getList({'query': 'releasegroup:(' + searchString + ')'}).toPromise();
    }

    public searchReleases(searchString: string): Promise<PaginatedArray<Release>> {
        return this.restangular.all('release').getList({'query': 'release:(' + searchString + ')'}).toPromise();
    }

    public searchRecordings(searchString: string): Promise<PaginatedArray<Recording>> {
        return this.restangular.all('recording').getList({'query': 'recording:(' + searchString + ')'}).toPromise();
    }
}
