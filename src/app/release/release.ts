import {MusicbrainzEntity} from "../api/musicbrainz-entity";
import {FlexDate} from "../flex-date/flex-date";
import {ArtistCredit} from "../artist/artist-credit";
import {Medium} from "../medium/medium";

export class Release extends MusicbrainzEntity {

    title: string;
    status: string;
    country: string;
    date: FlexDate;
    artistCredits: Array<ArtistCredit>;
    media: Array<Medium>;

    public static parse(data: any): Release
    {
        let release = new Release();
        release.id = data['id'];
        release.title = data['title'];
        release.status = data['status'];
        release.date = FlexDate.parse(data['date']);
        release.country = data['country'];

        if (data.hasOwnProperty('artist-credit')) {
            release.artistCredits = [];
            for (let rawArtistCredit of data['artist-credit']) {
                release.artistCredits.push(ArtistCredit.parse(rawArtistCredit))
            }
        }

        if (data.hasOwnProperty('media')) {
            release.media = [];
            for (let rawMedium of data['media']) {
                release.media.push(Medium.parse(rawMedium));
            }
        }

        return release;
    }
}
