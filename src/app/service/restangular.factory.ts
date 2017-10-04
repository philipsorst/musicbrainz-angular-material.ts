import {ReleaseGroup} from "../model/release-group";
import {PaginatedArray} from "../module/paginated-array";
import {Artist} from "../model/artist";
import {Release} from "../model/release";

export function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl('https://musicbrainz.org/ws/2/');
    RestangularProvider.setDefaultRequestParams({'fmt': 'json'});
    RestangularProvider.setDefaultHttpFields({cache: true});

    function findCount(data: any) {

        if (data.hasOwnProperty('count')) {
            return data['count'];
        }

        if (data.hasOwnProperty('release-group-count')) {
            return data['release-group-count'];
        }

        if (data.hasOwnProperty('release-count')) {
            return data['release-count'];
        }

        console.error('No count found', data);

        return 0;
    }

    function findOffset(data: any) {

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

    RestangularProvider.addResponseInterceptor((data, operation, what, url, response) => {

        if ('artist' === what) {

            if (!data.hasOwnProperty('artists')) {
                return Artist.parse(data);
            }

            let collectionResponse: PaginatedArray<Artist> = new PaginatedArray<Artist>();
            for (let rawArtist of data['artists']) {
                collectionResponse.push(Artist.parse(rawArtist));
            }
            collectionResponse.pagination = {
                'count': findCount(data),
                'offset': findOffset(data)
            };

            return collectionResponse;
        }

        if ('release' === what) {

            if (!data.hasOwnProperty('releases')) {
                return Artist.parse(data);
            }

            let collectionResponse: PaginatedArray<Release> = new PaginatedArray<Release>();
            for (let rawRelease of data['releases']) {
                collectionResponse.push(Release.parse(rawRelease));
            }
            collectionResponse.pagination = {
                'count': findCount(data),
                'offset': findOffset(data)
            };

            return collectionResponse;
        }

        if ('release-group' === what) {

            if (!data.hasOwnProperty('release-groups')) {
                return ReleaseGroup.parse(data);
            }

            let collectionResponse: PaginatedArray<ReleaseGroup> = new PaginatedArray<ReleaseGroup>();
            for (let rawReleaseGroup of data['release-groups']) {
                collectionResponse.push(ReleaseGroup.parse(rawReleaseGroup));
            }
            collectionResponse.pagination = {
                'count': findCount(data),
                'offset': findOffset(data)
            };

            return collectionResponse;
        }

        console.warn('Unhandled response', {
            'data': data,
            'operation': operation,
            'what': what,
            'url': url,
            'response': response
        });
        return data;
    })
}
