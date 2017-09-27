export function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl('https://musicbrainz.org/ws/2/');
    RestangularProvider.setDefaultRequestParams({'fmt': 'json'});
    RestangularProvider.setDefaultHttpFields({cache: true});
}
