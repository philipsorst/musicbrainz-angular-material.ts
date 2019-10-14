import {MusicbrainzEntity} from "../api/musicbrainz-entity";
import {ArtistCredit} from "../artist/artist-credit";

export class Recording extends MusicbrainzEntity {

    disambiguation: string;
    length: number;
    title: string;
    video: boolean;
    artistCredits: Array<ArtistCredit>;

    public static parse(data: any): Recording {
        let recording = new Recording();
        recording.id = data['id'];
        recording.disambiguation = data['disambiguation'];
        recording.length = +data['length'];
        recording.title = data['title'];
        recording.video = data['video'];

        if (data.hasOwnProperty('artist-credit')) {
            recording.artistCredits = [];
            for (let rawArtistCredit of data['artist-credit']) {
                recording.artistCredits.push(ArtistCredit.parse(rawArtistCredit))
            }
        }

        return recording;
    }
}
