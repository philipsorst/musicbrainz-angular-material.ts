import {ReleaseGroup} from "../model/release-group";
import {PaginatedArray} from "../module/paginated-array";

export function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl('https://musicbrainz.org/ws/2/');
    RestangularProvider.setDefaultRequestParams({'fmt': 'json'});
    RestangularProvider.setDefaultHttpFields({cache: true});
    RestangularProvider.addResponseInterceptor((data, operation, what, url, response) => {
        console.log('data', data);
        console.log('operation', operation);
        console.log('what', what);
        console.log('url', url);
        console.log('response', response);

        if ('release-group' === what && 'getList' === operation) {

            let collectionResponse: PaginatedArray<ReleaseGroup> = new PaginatedArray<ReleaseGroup>();
            for (let rawReleaseGroup of data['release-groups']) {
                collectionResponse.push(ReleaseGroup.parse(rawReleaseGroup));
            }
            collectionResponse.pagination = {
                'count': data['release-group-count'],
                'offset': data['release-group-offset']
            };
            return collectionResponse;
        }

        return data;
    })
}
