import {FlexDate} from "../flex-date/flex-date";
import {MusicbrainzEntity} from "../api/musicbrainz-entity";
import {ArtistCredit} from "../artist/artist-credit";

export class ReleaseGroup extends MusicbrainzEntity
{
    title: string;
    firstReleaseDate: FlexDate;
    primaryType: string;
    secondaryTypes: string[];
    artistCredits: Array<ArtistCredit>;

    public static parse(data: any): ReleaseGroup
    {
        let releaseGroup = new ReleaseGroup();
        releaseGroup.id = data.id;
        releaseGroup.title = data.title;
        releaseGroup.firstReleaseDate = FlexDate.parse(data['first-release-date']);
        releaseGroup.primaryType = data['primary-type'];
        releaseGroup.secondaryTypes = data['secondary-types'];

        if (data.hasOwnProperty('artist-credit')) {
            releaseGroup.artistCredits = [];
            for (let rawArtistCredit of data['artist-credit']) {
                releaseGroup.artistCredits.push(ArtistCredit.parse(rawArtistCredit))
            }
        }

        return releaseGroup;
    }
}
