import {MusicbrainzEntity} from "./musicbrainz-entity";

export class Artist extends MusicbrainzEntity {
    name: string;
    disambiguation: string;
    country: string;
    type: string;

    public static parse(data: any): Artist {
        let artist = new Artist();
        artist.id = data.id;
        artist.name = data.name;
        artist.disambiguation = data.disambiguation;
        artist.country = data.country;
        artist.type = data.type;

        return artist;
    }
}
