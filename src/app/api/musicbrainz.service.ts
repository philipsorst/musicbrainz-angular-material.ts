import {Injectable} from "@angular/core";
import {ReleaseGroup} from "../release-group/release-group";
import {PaginatedArray} from "./paginated-array";
import {Artist} from "../artist/artist";
import {Recording} from "../recording/recording";
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {expand, map, reduce} from 'rxjs/operators';
import {Release} from '../release/release';

@Injectable()
export class MusicbrainzService
{
    private static readonly BASE_URL = 'https://musicbrainz.org/ws/2/';

    constructor(private httpClient: HttpClient)
    {
    }

    public findArtist(id: string): Observable<Artist>
    {
        return this.httpClient.get<Artist>('https://musicbrainz.org/ws/2/artist/' + id);
    }

    public findReleaseGroup(id: string): Observable<ReleaseGroup>
    {
        return this.httpClient.get<ReleaseGroup>('https://musicbrainz.org/ws/2/release-group/' + id, {params: {'inc': 'artists'}});
    }

    public findRelease(id: string): Observable<Release>
    {
        return this.httpClient.get<Release>('https://musicbrainz.org/ws/2/release/' + id, {params: {'inc': 'artists+recordings+artist-credits'}});
    }

    public listAllReleaseGroupsByArtist(artistId: string): Observable<ReleaseGroup[]>
    {
        return this.collectPaginated<ReleaseGroup>(
            'release-group',
            'release-groups',
            ReleaseGroup.parse,
            {artist: artistId}
        );

    }

    public listAllReleasesByReleaseGroup(releaseGroupId: string): Observable<Array<Release>>
    {
        return this.collectPaginated<Release>(
            'release',
            'releases',
            Release.parse,
            {'release-group': releaseGroupId}
        );
    }

    public searchArtists(searchString: string): Observable<PaginatedArray<Artist>>
    {
        return this.getPaginated<Artist>(
            'artist',
            'artists',
            Artist.parse,
            {'query': 'artist:(' + searchString + ')'}
        );
    }

    public searchReleaseGroups(searchString: string): Observable<PaginatedArray<ReleaseGroup>>
    {
        return this.getPaginated<ReleaseGroup>(
            'release-group',
            'release-groups',
            ReleaseGroup.parse,
            {'query': 'releasegroup:(' + searchString + ')'}
        );
    }

    public searchReleases(searchString: string): Observable<PaginatedArray<Release>>
    {
        return this.getPaginated(
            'release',
            'releases',
            Release.parse,
            {'query': 'release:(' + searchString + ')'}
        );
    }

    public searchRecordings(searchString: string): Observable<PaginatedArray<Recording>>
    {
        return this.getPaginated(
            'recording',
            'recordings',
            Recording.parse,
            {'query': 'recording:(' + searchString + ')'}
        );
    }

    private getPaginated<T>(
        path: string,
        resultProperty: string,
        parser: (data: any) => T,
        params?: | { [p: string]: string | string[] }
    ): Observable<PaginatedArray<T>>
    {
        return this.httpClient.get<any>(MusicbrainzService.BASE_URL + path, {params}).pipe(
            map(data => {
                let paginatedArray: PaginatedArray<T> = new PaginatedArray<T>();
                for (let arrayData of data[resultProperty]) {
                    paginatedArray.push(parser(arrayData));
                }
                paginatedArray.pagination = {
                    'count': this.findCount(data),
                    'offset': this.findOffset(data)
                };

                return paginatedArray;
            })
        )
    }

    private collectPaginated<T>(
        path: string,
        resultProperty: string,
        parser: (data: any) => T,
        params?: | { [p: string]: string | string[] },
        limit = 100
    )
    {
        if (null == params) {
            params = {};
        }
        params.offset = String(0);
        params.limit = String(limit);

        return this.getPaginated(
            path,
            resultProperty,
            parser,
            params
        ).pipe(
            expand(paginatedArray => {
                if (paginatedArray.pagination.offset + limit > paginatedArray.pagination.count) {
                    return EMPTY;
                }

                params.offset = String(paginatedArray.pagination.offset + limit);

                return this.getPaginated(
                    path,
                    resultProperty,
                    parser,
                    params
                )
            }),
            reduce((
                collectedResults,
                paginatedArray
            ) => collectedResults.concat(paginatedArray), [])
        )
    }

    private findCount(data: any)
    {
        if (data.hasOwnProperty('count')) {
            return data['count'];
        }

        if (data.hasOwnProperty('artist-count')) {
            return data['artist-count'];
        }

        if (data.hasOwnProperty('release-group-count')) {
            return data['release-group-count'];
        }

        if (data.hasOwnProperty('release-count')) {
            return data['release-count'];
        }

        if (data.hasOwnProperty('recording-count')) {
            return data['recording-count'];
        }

        console.error('No count found', data);

        return 0;
    }

    private findOffset(data: any)
    {

        if (data.hasOwnProperty('offset')) {
            return data['offset'];
        }

        if (data.hasOwnProperty('release-group-offset')) {
            return data['release-group-offset'];
        }

        if (data.hasOwnProperty('release-offset')) {
            return data['release-offset'];
        }

        console.error('No offset found', data);

        return 0;
    }
}
